var completedStage = -1;
var repetions = 3;
var rep = 0;
import { NormalizedLandmarkList } from '@mediapipe/pose';
import Exercise from '../dataModels/exercise';
import { findAngles, checkStageAngle } from './utils';

// function checkVisibility(required_joints: any, landmarks: any) {
//   for (let i = 0; i < required_joints.length; i++) {
//     let c = required_joints[i];
//     if (c % 2 === 0) {
//       let coord = landmarks[required_joints[i]];
//       if (coord.visibility < 0.7) {
//         return false;
//       }
//     }
//   }
//   return true;
// }

export default function stageLogic(
  exercise: Exercise,
  canvasElement: HTMLCanvasElement,
  canvasContext: CanvasRenderingContext2D,
  landmarks: NormalizedLandmarkList,
  onSpeak?: (text: string, priority: number) => void,
  onStageComplete?: (stage: number) => void,
  onRepComplete?: (reps: number) => void,
  onActivityComplete?: () => void,
  onError?: (error: Error) => void,
) {
  let sequence = exercise.stageSequence;
  console.log('Stage Sequence', sequence);
  let currentAngles = findAngles(landmarks);
  console.log('current stage:', completedStage);
  if (completedStage === -1) {
    //start of the exercise

    //speak function for starting exercise
    // console.log('Raise your hands');
    if (onSpeak) onSpeak(exercise.stages[sequence[0]].introMessage, 8);
    // rule check for stage
    let resp = checkStageAngle(
      currentAngles,
      exercise.stages[sequence[0]].joints,
    );
    // console.log(resp)
    if (resp.status) {
      completedStage++;
      if (onStageComplete) onStageComplete(completedStage);
    } else {
      // console.log(resp.errors);
      // if (onSpeak) onSpeak(resp.errors as string, 7);
    }
  } else if (completedStage < sequence.length - 1) {
    let next_stage = sequence[completedStage + 1];
    if (onSpeak) onSpeak(exercise.stages[next_stage].introMessage, 8);
    let resp = checkStageAngle(
      currentAngles,
      exercise.stages[next_stage].joints,
    );
    if (resp.status) {
      completedStage++;
      if(completedStage === sequence.length - 1 && rep<repetions-1){
        completedStage = -1;
        rep += 1
      }
      if (onStageComplete) onStageComplete(completedStage);
    } else {
      // console.log(resp.errors);
      // if (onSpeak) onSpeak(resp.errors as string, 7);
    }
  } else {
    // console.log('Exercise Over');
    if (onSpeak) onSpeak('The exercise is over, please take rest.', 10);
    if (onActivityComplete) onActivityComplete();
  }
  //const moving_joints = exercise.requiredJoints;
  // console.log(moving_joints)
}
