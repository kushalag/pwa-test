import { Pose, Results } from '@mediapipe/pose';
import PoseEngine from './poseEngine';

/**
 * Get the pose engine
 * @param {(results: Results) => Promise<void>} poseProcessor - Pose processor to use
 * @param {(error: Error) => void} onError - Function to call when error occurs
 * @returns {Promise<Pose | Error>} Pose engine
 *
 * @example
 * // Get the pose engine
 * const poseEngine = getPoseEngine(poseProcessor, onError);
 */
export default async function getPoseEngine(
  poseProcessor: (results: Results) => Promise<void>,
  onError?: (error: Error) => void,
): Promise<Pose | Error> {
  try {
    // Create a new pose engine instance
    const poseEngine = new PoseEngine(
      {
        locateFile(file: string) {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        },
      },
      {
        modelComplexity: 1,
        smoothLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      },
    );

    // Add the onResults callback to pose model
    poseEngine.pose.onResults(poseProcessor);

    // Load and intialize the pose model
    await poseEngine.pose.initialize();

    // Return the pose model
    return poseEngine.pose;
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
