import Stage, { StageType } from './stage';

/**
 * Exercise Data Model Class
 * @class Exercise
 * @export Exercise
 *
 * @property {number} uid - Exercise UID
 * @property {string} name - Exercise name
 * @property {string} videoUrl - Exercise video
 * @property {string} imageUrl - Exercise preview image
 * @property {number[]} requiredJoints - Required joints for exercise
 * @property {string} introMessage - Exercise intro message
 * @property {string} introAudio - Exericse intro audio
 * @property {number} categoryUid - Exercise category UID
 * @property {string} categoryName - Exercise category name
 * @property {ToleranceLevel} toleranceLevel - Exercise tolerance level
 * @property {number[]} stageSequence - Exercise stage sequence
 * @property {Stage[]} stages - Exercise stages
 * @property {Stage[]} startingStages - Exercise starting stages
 * @property {Stage[]} mainStages - Exercise main stages
 * @property {Stage[]} endingStages - Exercise ending stages
 */
export default class Exercise {
  public readonly uid: number;
  public readonly name: string;

  public readonly videoUrl: string;
  public readonly imageUrl: string;

  public readonly requiredJoints: number[];

  public readonly introMessage: string;
  public readonly introAudio: string;

  public readonly categoryUid: number;
  public readonly categoryName: string;

  public readonly toleranceLevel: ToleranceLevel;
  public readonly userDirection: UserDirection;

  public readonly stageSequence: number[];
  private _stages: Stage[] = [];

  /**
   * Exercise Constructor
   * @param {number} uid - Exercise UID
   * @param {string} name - Exercise name
   * @param {string} videoUrl - Exercise video
   * @param {string} imageUrl - Exercise preview image
   * @param {number[]} requiredJoints - Required joints for exercise
   * @param {string} introMessage - Exercise intro message
   * @param {string} introAudio - Exercise intro audio
   * @param {number} categoryUid - Exercise category UID
   * @param {string} categoryName - Exercise category name
   * @param {ToleranceLevel} toleranceLevel - Exercise tolerance level
   * @param {UserDirection} userDirection - Exercise user direction
   * @param {number[]} stageSequence - Exercise stage sequence
   * @param {Stage[]} stages - Exercise starting stages
   * @memberof Exercise
   * @constructor
   *
   * @throws {Error} - If any of the parameters is not defined
   */
  constructor(
    uid: number,
    name: string,
    videoUrl: string,
    imageUrl: string,
    requiredJoints: number[],
    introMessage: string,
    introAudio: string,
    categoryUid: number,
    categoryName: string,
    toleranceLevel: ToleranceLevel = ToleranceLevel.Medium,
    userDirection: UserDirection = UserDirection.Right,
    stageSequence: number[],
    stages: Stage[] = [],
  ) {
    this.uid = uid;
    this.name = name;
    this.videoUrl = videoUrl;
    this.imageUrl = imageUrl;
    this.requiredJoints = requiredJoints;
    this.introMessage = introMessage;
    this.introAudio = introAudio;
    this.categoryUid = categoryUid;
    this.categoryName = categoryName;
    this.toleranceLevel = toleranceLevel;
    this.userDirection = userDirection;
    this.stageSequence = stageSequence;
    this.stages = stages;
  }

  /* tslint:disable:no-string-literal */
  public static fromJson(json: { [key: string]: any }): Exercise {
    const exercise = new Exercise(
      json['uid'] as number,
      json['name'] as string,
      json['videoUrl'] as string,
      json['imageUrl'] as string,
      json['requiredJoints'] as number[],
      json['introMessage'] as string,
      json['introAudio'] as string,
      json['category'] as number,
      json['categoryName'] as string,
      (json['toleranceLevel'] as number) === 0
        ? ToleranceLevel.Low
        : (json['toleranceLevel'] as number) === 1
        ? ToleranceLevel.Medium
        : ToleranceLevel.High,
      (json['userDirection'] as string) === 'Left'
        ? UserDirection.Left
        : (json['userDirection'] as string) === 'Right'
        ? UserDirection.Right
        : (json['userDirection'] as string) === 'Front'
        ? UserDirection.Front
        : UserDirection.Back,
      (json['stageSequence'] as string)
        .split(',')
        .map(stage => parseInt(stage, 10)),
      (json['stages'] as object[]).map(Stage.fromJson),
    );
    return exercise;
  }
  /* tslint:enable:no-string-literal */

  public get stages(): Stage[] {
    return this._stages;
  }

  public set stages(stages: Stage[]) {
    if (!stages) throw new Error('Stages are required');
    if (!Array.isArray(stages)) throw new Error('Stages must be an array');
    if (stages.some(stage => !stage || !(stage instanceof Stage)))
      throw new Error('Stages must contain valid stages');
    if (stages.some(stage => stage.exerciseUid !== this.uid))
      throw new Error('Stages must belong to the same exercise');
    // if (stages.filter(stage => stage.type === StageType.Starting).length < 1)
    //   throw new Error('Stages must have at least 1 starting stage');
    if (stages.filter(stage => stage.type === StageType.Main).length < 2)
      throw new Error('Stages must have at least 2 main stages');
    // if (stages.filter(stage => stage.type === StageType.Ending).length < 1)
    //   throw new Error('Stages must have at least 1 ending stage');

    this._stages = stages;
  }

  public get startingStages(): Stage[] {
    return this._stages.filter(stage => stage.type === StageType.Starting);
  }

  public get mainStages(): Stage[] {
    return this._stages.filter(stage => stage.type === StageType.Main);
  }

  public get endingStages(): Stage[] {
    return this._stages.filter(stage => stage.type === StageType.Ending);
  }
}

/**
 * Exercise Tolerance Level Enum
 * @enum {number} ToleranceLevel
 * @export ToleranceLevel
 * @readonly
 */
export enum ToleranceLevel {
  Low = 0,
  Medium = 1,
  High = 2,
}

/**
 * Exercise User Direction Enum
 * @enum {number} UserDirection
 * @export UserDirection
 * @readonly
 */
export enum UserDirection {
  Left = 'Left',
  Right = 'Right',
  Front = 'Front',
  Back = 'Back',
}
