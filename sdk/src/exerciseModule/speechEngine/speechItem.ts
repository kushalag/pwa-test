import SpeechEngine from './speechEngine';
import { SpeechStatus } from './speechStatus';

export default class SpeechItem {
  public readonly text: string;
  public readonly priority: number;
  private _status: SpeechStatus;
  private _utterance: SpeechSynthesisUtterance;
  public readonly createdAt: Date;
  private _startedAt: Date | null;

  private listenerAbortController: AbortController;

  public get status(): SpeechStatus {
    return this._status;
  }
  private set status(value: SpeechStatus) {
    this._status = value;
  }

  public get utterance(): SpeechSynthesisUtterance {
    return this._utterance;
  }
  private set utterance(value: SpeechSynthesisUtterance) {
    this._utterance = value;
  }

  public get startedAt(): Date | null {
    return this._startedAt;
  }
  private set startedAt(value: Date | null) {
    this._startedAt = value;
  }

  constructor(
    text: string,
    priority: number = 0,
    status: SpeechStatus = SpeechStatus.Idle,
    language: string = 'en-US',
    pitch: number = 1,
    playbackRate: number = 1,
    volume: number = 1,
    voice?: SpeechSynthesisVoice,
  ) {
    this.text = text;
    this.priority = priority;
    this._status = status;
    this._utterance = new SpeechSynthesisUtterance(text);
    this._utterance.lang = language;
    this._utterance.pitch = pitch;
    this._utterance.rate = playbackRate;
    this._utterance.volume = volume;
    if (voice) {
      this._utterance.voice = voice;
    }
    this.createdAt = new Date(Date.now());
    this.listenerAbortController = new AbortController();
    this._startedAt = null;

    this._utterance.addEventListener(
      'start',
      () => {
        this.startedAt = new Date(Date.now());
        this.status = SpeechStatus.Speaking;
        SpeechEngine.setPriorityCall(this.priority);
      },
      {
        capture: true,
        once: true,
        passive: true,
        signal: this.listenerAbortController.signal,
      },
    );
    this._utterance.addEventListener(
      'end',
      () => {
        this.status = SpeechStatus.Completed;
        this.listenerAbortController.abort();
        SpeechEngine.setPriorityCall(this.priority);
        SpeechEngine.moveToNextSpeechItem();
      },
      {
        capture: true,
        once: true,
        passive: true,
        signal: this.listenerAbortController.signal,
      },
    );
    this._utterance.addEventListener(
      'error',
      () => {
        this.status = SpeechStatus.Error;
      },
      {
        capture: true,
        passive: true,
        signal: this.listenerAbortController.signal,
      },
    );
    this._utterance.addEventListener(
      'pause',
      () => {
        this.status = SpeechStatus.Paused;
      },
      {
        capture: true,
        passive: true,
        signal: this.listenerAbortController.signal,
      },
    );
    this._utterance.addEventListener(
      'resume',
      () => {
        this.status = SpeechStatus.Speaking;
      },
      {
        capture: true,
        passive: true,
        signal: this.listenerAbortController.signal,
      },
    );
  }
}
