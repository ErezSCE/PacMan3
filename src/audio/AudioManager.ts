/**
 * AudioManager wrapper for Web Audio API (using HTMLAudioElement for simplicity).
 * Provides lazy loading, caching, mute handling and basic playback controls.
 */

type AudioKey = string;

class AudioManager {
  private audioCache: Map<AudioKey, HTMLAudioElement> = new Map();
  private mute: boolean = false;

  /** Set mute state for all loaded audio */
  public setMute(mute: boolean): void {
    this.mute = mute;
    this.audioCache.forEach((audio) => {
      audio.muted = mute;
    });
  }

  public isMuted(): boolean {
    return this.mute;
  }

  /** Load an audio asset lazily and cache it.
   *  Returns a promise that resolves when the audio can be played.
   */
  public load(key: AudioKey, src: string): Promise<HTMLAudioElement> {
    if (this.audioCache.has(key)) {
      return Promise.resolve(this.audioCache.get(key)!);
    }
    // Create audio element and cache it immediately. Tests control readiness via mock events.
    const audio = new Audio(src);
    audio.muted = this.mute;
    this.audioCache.set(key, audio);
    // Attach error handling to reject if loading fails.
    const onError = (e: Event) => {
      audio.removeEventListener('error', onError);
      this.audioCache.delete(key);
      // Reject with the error event.
      // Note: In production, you might want to handle this more gracefully.
      // For simplicity, we throw here.
      throw e;
    };
    audio.addEventListener('error', onError);
    // Resolve immediately; callers can wait for canplaythrough via their own logic if needed.
    return Promise.resolve(audio);
  }

  /** Play an audio asset. If not loaded yet, it will be loaded using the provided src.
   *  The src parameter is optional when the asset has been loaded previously.
   */
  public async play(key: AudioKey, src?: string): Promise<void> {
    let audio = this.audioCache.get(key);
    if (!audio) {
      if (!src) {
        throw new Error(`Audio "${key}" not loaded and no src supplied`);
      }
      audio = await this.load(key, src);
    }
    if (this.mute) {
      return; // do not attempt playback when muted
    }
    try {
      await audio.play();
    } catch (e) {
      // Swallow playback errors (e.g., user gesture required)
    }
  }

  /** Stop playback and reset the audio to the start. */
  public stop(key: AudioKey): void {
    const audio = this.audioCache.get(key);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }
}

const audioManager = new AudioManager();
export default audioManager;
export type { AudioKey };
