import { NormalizedLandmark, NormalizedLandmarkList } from '@mediapipe/pose';
import Joint from '../dataModels/joint';

// calculate all the joint angles of the current landmarks
var angles: { [key: number]: number[] } = {
  27: [25, 27, 31],
  28: [26, 28, 32],
  25: [23, 25, 27],
  26: [24, 26, 28],
  23: [11, 23, 25],
  24: [12, 24, 26],
  11: [13, 11, 23],
  12: [14, 12, 24],
  13: [11, 13, 15],
  14: [12, 14, 16],
  15: [13, 15, 17],
  16: [14, 16, 18],
};

var angle_names: { [key: number]: string } = {
  27: 'LEFT_ANKLE_JOINT',
  28: 'RIGHT_ANKLE_JOINT',
  25: 'LEFT_KNEE_JOINT',
  26: 'RIGHT_KNEE_JOINT',
  23: 'LEFT_HIP_JOINT',
  24: 'RIGHT_HIP_JOINT',
  11: 'LEFT_SHOULDER_JOINT',
  12: 'RIGHT_SHOULDER_JOINT',
  13: 'LEFT_ELBOW_JOINT',
  14: 'RIGHT_ELBOW_JOINT',
  15: 'LEFT_WRIST_JOINT',
  16: 'RIGHT_WRIST_JOINT',
};

export function calculateAngles(
  first_joint: NormalizedLandmark,
  mid_joint: NormalizedLandmark,
  end_joint: NormalizedLandmark,
): number {
  var radians =
    Math.atan2(end_joint.y - mid_joint.y, end_joint.x - mid_joint.x) -
    Math.atan2(first_joint.y - mid_joint.y, first_joint.x - mid_joint.x);
  var angle = Math.abs((radians * 180.0) / Math.PI);
  if (angle > 180.0) angle = 360 - angle;
  return Math.round(angle);
}

export function findAngles(landmarks: NormalizedLandmarkList): {
  [key: number]: number;
} {
  let angleDict: { [key: number]: number } = {};
  for (const [key, value] of Object.entries(angles)) {
    const angle = calculateAngles(
      landmarks[value[0]],
      landmarks[value[1]],
      landmarks[value[2]],
    );
    angleDict[parseInt(key)] = angle;
  }
  return angleDict;
}

export function checkStageAngle(
  currentAngles: { [key: number]: number },
  jointArray: Joint[],
): { [key: string]: boolean | string } {
  let straigten_errors: string[] = [];
  let fold_errors: string[] = [];
  for (let i = 0; i < jointArray.length; i++) {
    const joint = jointArray[i];
    const range = [
      joint.angle - joint.tolerance,
      joint.angle + joint.tolerance,
    ];
    const key = joint.type;
    if (key % 2 === 0) {
      if (currentAngles[key] < range[0] || currentAngles[key] > range[1]) {
        //speak func for specific joints
        if (currentAngles[key] < range[0]) {
          fold_errors.push(angle_names[key]);
        } else {
          straigten_errors.push(angle_names[key]);
        }
      }
    }
  }
  if (straigten_errors.length == 0 && fold_errors.length == 0) {
    return { 'status': true, 'errors': '' };
  } else {
    let errors = '';
    errors = errors + 'Please Fold your ' + fold_errors[0];
    // for (let i = 0; i < fold_errors.length; i++) {
    //     errors += fold_errors[i] + "and";
    // }
    errors += 'please straighten your ' + straigten_errors[0];
    // for (let i = 0; i < straigten_errors.length; i++) {
    //     errors += straigten_errors[i] + "and";
    // }
    return { 'status': false, 'errors': errors };
  }
}
