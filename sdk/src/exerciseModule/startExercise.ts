import { Camera } from '@mediapipe/camera_utils';
import Exercise from './dataModels/exercise';
import getPoseEngine from './poseEngine/getPoseEngine';
import getPoseProcessor from './poseProcessor/getPoseProcessor';
import waitForTimeout from './utils/waitForTimeout';

/**
 * Start a new exercise
 * @param {Exercise} exercise - Exercise to start
 * @param {HTMLCanvasElement} canvasElement - Canvas element to read
 * @param {CanvasRenderingContext2D} canvasContext - Canvas context to draw on
 * @param {(text: String) => void} onSpeak - Function to call when speaking (either receives text or audio url)
 * @param {(stage: number) => void} onStageComplete - Function to call when stage is complete
 * @param {(reps: number) => void} onRepComplete - Function to call when rep is complete
 * @param {() => void} onActivityComplete - Function to call when activity is complete
 * @param {(error: Error) => void} onError - Function to call when error occurs
 * @returns {Promise<Camera | Error>} - Promise that resolves with the camera or rejects with an error
 */
export default async function startExercise(
  exercise: Exercise,
  canvasElement: HTMLCanvasElement,
  useDefaultIndicators: boolean,
  onSpeak?: (text: string, priority: number) => void,
  onStageComplete?: (stage: number) => void,
  onRepComplete?: (reps: number) => void,
  onActivityComplete?: () => void,
  onError?: (error: Error) => void,
): Promise<Camera | Error> {
  try {
    // Introduce the exercise
    if (onSpeak) onSpeak(exercise.introMessage, 10);
    // console.log(exercise.introMessage)
    // await waitForTimeout(1000 * 10);
    // else

    // Get the pose processor
    const poseProcessor = getPoseProcessor(
      exercise,
      canvasElement,
      canvasElement.getContext('2d') as CanvasRenderingContext2D,
      useDefaultIndicators,
      onSpeak,
      onStageComplete,
      onRepComplete,
      onActivityComplete,
      onError,
    );

    // Check if the pose processor returned an error
    if (poseProcessor instanceof Error) throw poseProcessor;

    // Get the pose engine
    const poseEngine = await getPoseEngine(poseProcessor);

    // Check if the pose engine returned an error
    if (poseEngine instanceof Error) throw poseEngine;

    // Check if media is available
    if (!navigator?.mediaDevices?.getUserMedia)
      throw new Error('No media devices');

    // Get the media stream
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: {
          ideal: 'user',
        },
        frameRate: {
          ideal: 30,
          max: 30,
          min: 10,
        },
      },
    });

    // Set canvas size
    canvasElement.width = stream.getVideoTracks()[0].getSettings()
      .width as number;
    canvasElement.height = stream.getVideoTracks()[0].getSettings()
      .height as number;

    // Create a video element
    const videoElement = document.createElement('video') as HTMLVideoElement;

    // Set the video stream
    videoElement.srcObject = stream;

    // Create a camera
    const camera = new Camera(videoElement, {
      onFrame: async () => {
        await poseEngine.send({ image: videoElement });
      },
      // width: 1280,
      // height: 720,
    });

    // Start the camera
    await camera.start();

    // Return the camera
    return camera;
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
