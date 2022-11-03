import Joint from './joint';

/**
 * Stage Data Model Class
 * @class Stage
 * @export Stage
 *
 * @property {number} uid - Stage UID
 * @property {number} number - Stage number
 * @property {StageType} type - Stage type
 * @property {number} exerciseUid - Stage exercise UID
 * @property {Joint[]} joints - Stage joints
 */
export default class Stage {
  public readonly uid: number;
  public readonly index: number;
  public readonly type: StageType;

  public readonly introMessage: string;
  public readonly introAudio: string;

  public readonly stageVideo: string;

  public readonly exerciseUid: number;

  private _joints: Joint[] = [];

  /**
   * Stage Constructor
   * @param {number} uid - Stage UID
   * @param {number} index - Stage number
   * @param {StageType} type - Stage type
   * @param {number} exerciseUid - Stage exercise UID
   * @param {Joint[]} joints - Stage joints
   */
  constructor(
    uid: number,
    index: number,
    type: StageType,
    introMessage: string,
    introAudio: string,
    stageVideo: string,
    exerciseUid: number,
    joints: Joint[] = [],
  ) {
    this.uid = uid;
    this.index = index;
    this.type = type;
    this.introMessage = introMessage;
    this.introAudio = introAudio;
    this.stageVideo = stageVideo;
    this.exerciseUid = exerciseUid;
    this.joints = joints;
  }

  /* tslint:disable:no-string-literal */
  /**
   * Get a Stage object from a JSON object
   * @param json - JSON Stage Data
   * @returns {Stage} - Stage Data Model Object
   */
  public static fromJson(json: { [key: string]: any }): Stage {
    const stage = new Stage(
      json['uid'] as number,
      json['index'] as number,
      json['type'] as number,
      json['introMessage'] as string,
      json['introAudio'] as string,
      json['stageVideo'] as string,
      json['exerciseUid'] as number,
      (json['joints'] as object[]).map(Joint.fromJson),
    );
    return stage;
  }
  /* tslint:enable:no-string-literal */

  /**
   * Get the joints of the stage
   * @returns {Joint[]} - Joints of the stage
   * @memberof Stage
   */
  public get joints(): Joint[] {
    return this._joints;
  }

  /**
   * Set joints of the stage
   * @param {Joint[]} joints - Joints of the stage
   * @memberof Stage
   * @throws {Error} - If any of the parameters is not defined
   */
  public set joints(joints: Joint[]) {
    this._joints = joints;
  }
}

/**
 * Stage Type Enum
 * @enum {number} StageType
 * @readonly
 */
export enum StageType {
  Starting = 0,
  Main = 1,
  Ending = 2,
}
