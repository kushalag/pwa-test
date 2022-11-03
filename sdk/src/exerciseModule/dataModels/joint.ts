/**
 * Joint Data Model Class
 * @class Joint
 * @export Joint
 *
 * @property {number} uid - Joint UID
 * @property {JointType} type - Joint type
 * @property {string} name - Joint name
 * @property {number} angle - Joint angle
 * @property {boolean} isMoving - Is the joint moving
 * @property {number} tolerance - Joint tolerance angle
 * @property {number} stageUid - Joint stage UID
 */
export default class Joint {
  public readonly uid: number;
  public readonly type: JointType;
  public readonly name: string;

  public readonly angle: number;
  public readonly isMoving: boolean;
  public readonly tolerance: number;

  public readonly stageUid: number;

  /**
   * Joint Constructor
   * @param {number} uid - Joint UID
   * @param {JointType} type - Joint type
   * @param {string} name - Joint name
   * @param {number} angle - Joint angle
   * @param {boolean} isMoving - Is the joint moving
   * @param {number} tolerance - Joint tolerance
   * @param {number} stageUid - Joint stage UID
   */
  constructor(
    uid: number,
    type: JointType,
    name: string,
    angle: number,
    isMoving: boolean,
    tolerance: number,
    stageUid: number,
  ) {
    this.uid = uid;
    this.type = type;
    this.name = name;
    this.angle = angle;
    this.isMoving = isMoving;
    this.tolerance = tolerance;
    this.stageUid = stageUid;
  }

  /* tslint:disable:no-string-literal */
  /**
   * Get a Joint object from a JSON object
   * @param json - JSON Joint Data
   * @returns {Joint} - Joint Data Model Object
   */
  public static fromJson(json: { [key: string]: any }): Joint {
    const joint = new Joint(
      json['uid'] as number,
      json['type'] as number,
      json['name'] as string,
      parseFloat(json['angle']) as number,
      json['isMoving'] as boolean,
      parseFloat(json['tolerance']) as number,
      json['stageUid'] as number,
    );
    return joint;
  }
  /* tslint:enable:no-string-literal */
}

/**
 * Joint Type Enum
 * @enum {number} JointType
 * @export JointType
 * @readonly
 */
export enum JointType {
  LEFT_ANKLE_JOINT = 27,
  RIGHT_ANKLE_JOINT = 28,
  LEFT_KNEE_JOINT = 25,
  RIGHT_KNEE_JOINT = 26,
  LEFT_HIP_JOINT = 23,
  RIGHT_HIP_JOINT = 24,
  LEFT_SHOULDER_JOINT = 11,
  RIGHT_SHOULDER_JOINT = 12,
  LEFT_ELBOW_JOINT = 13,
  RIGHT_ELBOW_JOINT = 14,
  LEFT_WRIST_JOINT = 15,
  RIGHT_WRIST_JOINT = 16,
}
