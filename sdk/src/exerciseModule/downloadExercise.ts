import Exercise from './dataModels/exercise';

export default async function downloadExercise(
  backendHost: string,
  exerciseUid: number,
  onProgress: (percent: number) => void,
  onComplete: (exercise: Exercise) => void,
  onError: (error: Error) => void,
): Promise<Exercise | void | Error> {
  try {
    // Start the progress
    if (onProgress) onProgress(0);

    // Fetch the exercise data
    const exerciseData = await fetch(
      `${
        backendHost ?? 'https://drl-healify-django.squareboat.info'
      }/api/exerciseDetails/${exerciseUid ?? 1}/`,
    );
    // Parse the exercsize
    const exercise = Exercise.fromJson(await exerciseData.json());

    // TODO: Fetch and cache audio and video data
    // TODO: update progress on download

    // Return the exercise
    if (onComplete) onComplete(exercise);
    return exercise;
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
