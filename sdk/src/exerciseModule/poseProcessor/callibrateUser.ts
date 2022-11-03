import { NormalizedLandmarkList } from '@mediapipe/pose';

export default function callibrateUser(landmarks: NormalizedLandmarkList): string | null {
  if ((landmarks[23].x + landmarks[24].x) / 2 > 0.7) {
    return 'Move to the right';
  }
  if ((landmarks[23].x + landmarks[24].x) / 2 < 0.3) {
    return 'Move to the left';
  }
  if (
    landmarks.some(
      landmark =>
        landmark.x < 0 || landmark.x > 1 || landmark.y < 0 || landmark.y > 1,
    )
  ) {
    return 'Move backwards';
  }
  if (Math.abs(landmarks[28].y - landmarks[0].y) < 0.3) {
    return 'Move forwards';
  }
  return null;
}
