import { Results } from '@mediapipe/pose';
import Exercise, { ToleranceLevel } from '../dataModels/exercise';
import processPose from './processPose';
import sampleData from '../dataModels/sampleData.json';

/**
 * Get the pose processor
 * @param {Exercise} exercise - Exercise to start
 * @param {HTMLCanvasElement} canvasElement - Canvas element to read
 * @param {CanvasRenderingContext2D} canvasContext - Canvas context to draw on
 * @param {boolean} useDefaultIndicators - Whether to use default indicators
 * @param {(text: String) => void} onSpeak - Function to call when speaking (either receives text or audio url)
 * @param {(stage: number) => void} onStageComplete - Function to call when stage is complete
 * @param {(reps: number) => void} onRepComplete - Function to call when rep is complete
 * @param {() => void} onActivityComplete - Function to call when activity is complete
 * @param {(error: Error) => void} onError - Function to call when error occurs
 * @returns Pose processor
 */
export default function getPoseProcessor(
  exercise: Exercise,
  canvasElement: HTMLCanvasElement,
  canvasContext: CanvasRenderingContext2D,
  useDefaultIndicators: boolean,
  onSpeak?: (text: string, priority: number) => void,
  onStageComplete?: (stage: number) => void,
  onRepComplete?: (reps: number) => void,
  onActivityComplete?: () => void,
  onError?: (error: Error) => void,
): ((results: Results) => Promise<void>) | Error {
  try {
    let cachedExercise: Exercise | null = null;
    let cachedCanvasElement: HTMLCanvasElement | null = null;
    let cachedCanvasContext: CanvasRenderingContext2D | null = null;
    let cachedUseDefaultIndicators: boolean | null = null;
    let cachedOnSpeak: ((text: string, priority: number) => void) | null = null;
    let cachedOnStageComplete: ((stage: number) => void) | null = null;
    let cachedOnRepComplete: ((reps: number) => void) | null = null;
    let cachedOnActivityComplete: (() => void) | null = null;
    let cachedOnError: ((error: Error) => void) | null = null;

    let poseProcessorInfoCached: boolean = false;

    return function poseProcessor(results: Results): Promise<void> {
      // If the pose processor has already been initialized, use it
      if (
        poseProcessorInfoCached &&
        cachedExercise === exercise &&
        cachedCanvasElement &&
        cachedCanvasContext &&
        cachedUseDefaultIndicators
      )
        return processPose(
          cachedExercise,
          cachedCanvasElement,
          cachedCanvasContext,
          cachedUseDefaultIndicators,
          results,
          cachedOnSpeak ?? undefined,
          cachedOnStageComplete ?? undefined,
          cachedOnRepComplete ?? undefined,
          cachedOnActivityComplete ?? undefined,
          cachedOnError ?? undefined,
        );

      // Set the pose processor initialized to true and cache the values
      poseProcessorInfoCached = true;
      cachedExercise = exercise;
      cachedCanvasElement = canvasElement;
      cachedCanvasContext = canvasContext;
      cachedUseDefaultIndicators = useDefaultIndicators;
      cachedOnSpeak = onSpeak ?? null;
      cachedOnStageComplete = onStageComplete ?? null;
      cachedOnRepComplete = onRepComplete ?? null;
      cachedOnActivityComplete = onActivityComplete ?? null;
      cachedOnError = onError ?? null;

      // Use a new pose processor
      return processPose(
        exercise,
        canvasElement,
        canvasContext,
        useDefaultIndicators,
        results,
        onSpeak,
        onStageComplete,
        onRepComplete,
        onActivityComplete,
        onError,
      );
    };
  } catch (error) {
    const constructedError: Error = (
      typeof error === 'string'
        ? Error(error)
        : error instanceof Error
        ? error
        : new Error('Unknown error')
    ) as Error;
    if (onError) onError(constructedError);
    /* tslint:disable-next-line */ else
      console.error('Unhandled Error:', error);
    return constructedError;
  }
}
