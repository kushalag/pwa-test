import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { POSE_CONNECTIONS, Results } from '@mediapipe/pose';
import Exercise from '../dataModels/exercise';
import callibrateUser from './callibrateUser';
import checkVisibility from './checkVisbility';
import stageLogic from './stageLogic';

let isUserCallibrated = false;

export default async function processPose(
  exercise: Exercise,
  canvasElement: HTMLCanvasElement,
  canvasContext: CanvasRenderingContext2D,
  useDefaultIndicators: boolean,
  results: Results,
  onSpeak?: (text: string, priority: number) => void,
  onStageComplete?: (stage: number) => void,
  onRepComplete?: (reps: number) => void,
  onActivityComplete?: () => void,
  onError?: (error: Error) => void,
): Promise<void> {
  try {
    // Get the widht and height of the canvas element
    const canvasWidth = canvasElement.width;
    const canvasHeight = canvasElement.height;

    // Add the result image to canvas
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    canvasContext.setTransform(-1, 0, 0, 1, canvasWidth, 0);
    canvasContext.drawImage(results.image, 0, 0, canvasWidth, canvasHeight);

    // Add the default indicators to canvas
    if (useDefaultIndicators) {
      // Add the rep indicator
      canvasContext.setTransform(1, 0, 0, 1, 0, 0);
      canvasContext.fillStyle = '#dce0e6';
      canvasContext.fillRect(
        canvasWidth - 0.15 * canvasWidth,
        0.08 * canvasHeight,
        canvasWidth,
        0.16 * canvasHeight,
      );
      canvasContext.fillStyle = 'black';
      canvasContext.font = '18px Arial';
      canvasContext.fillText(
        'REPS',
        canvasWidth - 0.1 * canvasWidth,
        0.14 * canvasHeight,
      );
      // canvasContext.fillText(
      //   (count < 0 ? 0 : count) + ' / ' + rep,
      //   canvasWidth - 0.09 * canvasWidth,
      //   0.2 * canvasHeight,
      // );
      canvasContext.setTransform(-1, 0, 0, 1, canvasWidth, 0);

      // Add the stage indicator
      canvasContext.setTransform(1, 0, 0, 1, 0, 0);
      canvasContext.fillStyle = '#dce0e6';
      canvasContext.fillRect(
        canvasWidth - 0.2 * canvasWidth,
        0.3 * canvasHeight,
        canvasWidth,
        0.16 * canvasHeight,
      );
      canvasContext.fillStyle = 'black';
      canvasContext.font = '18px Arial';
      canvasContext.fillText(
        'Stage',
        canvasWidth - 0.12 * canvasWidth,
        0.36 * canvasHeight,
      );
      // canvasContext.fillText(
      //   `${stageSequence.at(-1) ?? -1} -> ${stage} -> ${
      //     (stageSequence.at(-1) ?? -1) > stage ? stage - 1 : stage + 1
      //   }`,
      //   canvasWidth - 0.16 * canvasWidth,
      //   0.42 * canvasHeight,
      // );
      canvasContext.setTransform(-1, 0, 0, 1, canvasWidth, 0);
    }

    if (!results.poseLandmarks) {
      // console.log('You are not visible. Please come inside the frame.');
      if (onSpeak)
        onSpeak('You are not visible. Please come inside the frame.', 0);
      canvasContext.beginPath();
      canvasContext.lineWidth = 5;
      canvasContext.strokeStyle = 'red';
      canvasContext.rect(
        canvasWidth * 0.1,
        canvasHeight * 0.1,
        canvasWidth * 0.8,
        canvasHeight * 0.8,
      );
      canvasContext.stroke();
      return;
    }

    // Intelligent Calibration
    const callibrateUserResult = !isUserCallibrated
      ? callibrateUser(results.poseLandmarks)
      : false;
    if (callibrateUserResult) {
      // console.log('Callibrate User: ', callibrateUserResult);
      if (onSpeak) onSpeak(callibrateUserResult, 6);
      canvasContext.beginPath();
      canvasContext.lineWidth = 5;
      canvasContext.strokeStyle = 'red';
      canvasContext.rect(
        canvasWidth * 0.1,
        canvasHeight * 0.1,
        canvasWidth * 0.8,
        canvasHeight * 0.8,
      );
      canvasContext.stroke();
      drawConnectors(canvasContext, results.poseLandmarks, POSE_CONNECTIONS, {
        color: '#FFFFFF',
        lineWidth: 5,
      });
      drawLandmarks(canvasContext, results.poseLandmarks, {
        color: '#FF0000',
        lineWidth: 2,
        radius: 2,
      });
      return;
    }
    isUserCallibrated = true;

    // console.log(exercise.requiredJoints);
    if (!checkVisibility(results.poseLandmarks, exercise.requiredJoints)) {
      // console.log('Not visible');
      canvasContext.beginPath();
      canvasContext.lineWidth = 5;
      canvasContext.strokeStyle = 'red';
      canvasContext.rect(
        canvasWidth * 0.1,
        canvasHeight * 0.1,
        canvasWidth * 0.8,
        canvasHeight * 0.8,
      );
      canvasContext.stroke();
      drawConnectors(canvasContext, results.poseLandmarks, POSE_CONNECTIONS, {
        color: '#FFFFFF',
        lineWidth: 5,
      });
      drawLandmarks(canvasContext, results.poseLandmarks, {
        color: '#FF0000',
        lineWidth: 2,
        radius: 2,
      });
      if (onSpeak)
        onSpeak(
          'You are getting out of the frame. Please re align yourself.',
          0,
        );
      return;
    }

    canvasContext.beginPath();
    canvasContext.lineWidth = 5;
    canvasContext.strokeStyle = 'green';
    canvasContext.rect(
      canvasWidth * 0.1,
      canvasHeight * 0.1,
      canvasWidth * 0.8,
      canvasHeight * 0.8,
    );
    canvasContext.stroke();
    drawConnectors(canvasContext, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#FFFFFF',
      lineWidth: 5,
    });
    drawLandmarks(canvasContext, results.poseLandmarks, {
      color: '#0000FF',
      lineWidth: 2,
      radius: 2,
    });

    // drawConnectors(canvasContext, exercise.pos, POSE_CONNECTIONS, {
    //   color: '#FFFFFF',
    //   lineWidth: 5,
    // });
    // drawLandmarks(canvasContext, results.poseLandmarks, {
    //   color: '#0000FF',
    //   lineWidth: 2,
    //   radius: 2,
    // });

    // TODO: classify stage

    // TODO: ensure stage sequence

    // TODO: check moving joints

    // TODO: check non moving joints
    stageLogic(
      exercise,
      canvasElement,
      canvasContext,
      results.poseLandmarks,
      onSpeak,
      onStageComplete,
      onRepComplete,
      onActivityComplete,
      onError,
    );

    // throw new Error('Not implemented');
  } catch (error) {
    if (onError)
      onError(
        typeof error === 'string'
          ? Error(error)
          : error instanceof Error
          ? error
          : new Error('Unknown error'),
      );
    /* tslint:disable-next-line */ else
      console.error('Unhandled Error:', error);
  }
}
