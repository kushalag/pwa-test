import { Options, Pose, PoseConfig } from '@mediapipe/pose';

/**
 * Pose Engine Class
 * @class PoseEngine
 * @export PoseEngine
 *
 * @property {Pose} poseEngine - Pose engine
 */
export default class PoseEngine {
  private static _pose: Pose;

  constructor(poseConfig: PoseConfig, options: Options) {
    if (!PoseEngine._pose) {
      PoseEngine._pose = new Pose(poseConfig);
      PoseEngine._pose.setOptions(options);
    }
  }

  public get pose(): Pose {
    return PoseEngine._pose;
  }
}
