import SpeechItem from './speechItem';
import { SpeechStatus } from './speechStatus';

export default class SpeechEngine {
  private static _speechQueue: SpeechItem[] = [];
  private static lastPriorityCalls: { [key: number]: Date } = {
    0: new Date(0),
    1: new Date(0),
    2: new Date(0),
    3: new Date(0),
    4: new Date(0),
    5: new Date(0),
    6: new Date(0),
    7: new Date(0),
    8: new Date(0),
    9: new Date(0),
    10: new Date(0),
  };
  public static readonly BUFFER_TIME = 1000 * 4; // 4 Second Buffer Time

  public static get currentPriority(): number {
    return SpeechEngine._speechQueue[0]?.priority ?? -1;
  }

  public static get currentStatus(): SpeechStatus {
    return SpeechEngine._speechQueue[0]?.status ?? SpeechStatus.Idle;
  }

  public static get currentSpeechItem(): string {
    return SpeechEngine._speechQueue[0]?.text ?? '';
  }

  public static get speechQueue(): SpeechItem[] {
    return SpeechEngine._speechQueue;
  }

  private static sortSpeechQueue(): void {
    // console.log('Pre Sort Queue', SpeechEngine._speechQueue);
    // SpeechEngine._speechQueue.sort((a, b) => b.priority - a.priority);
    // console.log('Post Sort Queue', SpeechEngine._speechQueue);
  }

  private static clearSpeechQueue(): void {
    if (window?.speechSynthesis?.speaking) {
      window.speechSynthesis.cancel();
    }
    SpeechEngine._speechQueue = [];
  }

  public static addToSpeechQueue(speechItem: SpeechItem): void {
    // console.log('Speech Queue', SpeechEngine._speechQueue);
    // console.log('New Item', speechItem);

    if (
      SpeechEngine.lastPriorityCalls[speechItem.priority].getTime() +
        SpeechEngine.BUFFER_TIME >
      speechItem.createdAt.getTime()
    ) {
      // console.log(`Speech Item Skipped | Buffer Time`);
      return;
    }

    if (SpeechEngine.currentPriority < speechItem.priority) {
      // console.log(
      //   `Speech Item Enforced | Higher Priorty | ${SpeechEngine.currentPriority} -> ${speechItem.priority}`,
      // );
      SpeechEngine.clearSpeechQueue();
      window?.speechSynthesis?.speak(speechItem.utterance);
      SpeechEngine._speechQueue = [speechItem];
      return;
    }

    if (SpeechEngine.currentPriority === speechItem.priority) {
      // console.log(
      //   `Speech Item Skipped | Priority Match : ${speechItem.priority}`,
      // );
      return;
    }

    SpeechEngine._speechQueue.push(speechItem);
    SpeechEngine.setPriorityCall(speechItem.priority);
    SpeechEngine.sortSpeechQueue();

    if (window?.speechSynthesis?.speaking === false) {
      window?.speechSynthesis?.speak(SpeechEngine._speechQueue[0]?.utterance);
    }

    if (SpeechEngine.currentStatus === SpeechStatus.Error) {
      SpeechEngine.moveToNextSpeechItem();
    }
  }

  public static moveToNextSpeechItem(): void {
    // console.log('Moved To Next Speech Item');
    if (window?.speechSynthesis?.speaking) {
      window.speechSynthesis.cancel();
    }
    SpeechEngine._speechQueue.shift();
    SpeechEngine.sortSpeechQueue();
    if (SpeechEngine._speechQueue.length > 0 && window?.speechSynthesis) {
      window?.speechSynthesis?.speak(SpeechEngine._speechQueue[0]?.utterance);
    }
  }

  public static setPriorityCall(priority: number): void {
    SpeechEngine.lastPriorityCalls[priority] = new Date(Date.now());
  }
}
