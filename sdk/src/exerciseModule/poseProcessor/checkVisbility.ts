import { NormalizedLandmarkList } from '@mediapipe/pose';

export default function checkVisibility(
  landmarks: NormalizedLandmarkList,
  requiredJoints: number[],
) {
  let visbility: number[] = [];
  for (const requiredJoint of requiredJoints) {
    if(requiredJoint%2 !== 0){
      const coord = landmarks[requiredJoint];
      if (!coord || !coord.visibility || coord.visibility < 0.6) {
        visbility.push(requiredJoint);
      }
    } 
  }
  console.log('Joints not visible: ', visbility);
  if (visbility.length > 0) {
    return false;
  }
  return true;
}
