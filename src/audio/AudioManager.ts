/**
 * AudioManager wrapper for Web Audio API (using HTMLAudioElement for simplicity).
 * Provides lazy loading, caching, mute handling and basic playback controls.
 */

type AudioKey = string;

class AudioManager {
  private audioCache: Map<AudioKey, HTMLAudioElement> = new Map();
  private audioSrcMap: Map<AudioKey, string> = new Map();
  private loadingPromises: Map<AudioKey, Promise<HTMLAudioElement>> = new Map();
  private mute: boolean = false;
  private loadTimeoutMs: number = 5000; // default timeout in ms

  /**
   * Set the load timeout in milliseconds. Allows adjusting for slower networks.
   */
  public setLoadTimeout(ms: number): void {
    if (ms <= 0) {
      throw new Error('Load timeout must be positive');
    }
    this.loadTimeoutMs = ms;
  }
  private muteListeners: Set<(muted: boolean) => void> = new Set();

  /** Set mute state for all loaded audio */
  public setMute(mute: boolean): void {
    this.mute = mute;
    this.audioCache.forEach((audio) => {
      audio.muted = mute;
    });
    // Notify listeners about mute state change
    this.muteListeners.forEach((listener) => {
      try {
        listener(this.mute);
      } catch (e) {
        // swallow listener errors to avoid breaking setMute
      }
    });
  }

  /** Subscribe to mute state changes. Returns an unsubscribe function. */
  public subscribeMute(listener: (muted: boolean) => void): () => void {
    this.muteListeners.add(listener);
    // Return cleanup function
    return () => {
      this.muteListeners.delete(listener);
    };
  }

  public isMuted(): boolean {
    return this.mute;
  }

  /** Load an audio asset lazily and cache it.
   *  Returns a promise that resolves when the audio can be played.
   */
  public load(key: AudioKey, src: string): Promise<HTMLAudioElement> {
    // Return cached audio if already loaded and ready
    if (this.audioCache.has(key)) {
      const existingSrc = this.audioSrcMap.get(key);
      if (existingSrc && existingSrc !== src) {
        // Source mismatch: reject to avoid playing wrong sound
        return Promise.reject(new Error(`Audio source mismatch for key "${key}"`));
      }
      return Promise.resolve(this.audioCache.get(key)!);
    }
    // If a load is already in progress, return the existing promise
    if (this.loadingPromises.has(key)) {
      return this.loadingPromises.get(key)!;
    }
    // Create audio element but do NOT cache it yet; cache only after it can play through.
    const audio = new Audio(src);
    audio.muted = this.mute;

    const loadPromise = new Promise<HTMLAudioElement>((resolve, reject) => {
      // Timeout fallback to avoid hanging indefinitely
      const timeoutId = setTimeout(() => {
        cleanup();
        this.loadingPromises.delete(key);
        reject(new Error('Audio load timeout'));
      }, this.loadTimeoutMs);


      const onError = (e: Event) => {
        cleanup();
        // Ensure no stale entries remain
        this.loadingPromises.delete(key);
        // Reject with a defined error object
        reject(e || new Error('Audio load error'));
      };
      const onCanPlay = () => {
        cleanup();
        // Cache the ready audio for future calls
        this.audioCache.set(key, audio);
        this.audioSrcMap.set(key, src);
        this.loadingPromises.delete(key);
        resolve(audio);
      };
      const cleanup = () => {
        audio.removeEventListener('error', onError);
        audio.removeEventListener('canplaythrough', onCanPlay);
        audio.removeEventListener('loadedmetadata', onCanPlay);
        clearTimeout(timeoutId);
      };
      audio.addEventListener('error', onError);
      audio.addEventListener('canplaythrough', onCanPlay);
        audio.addEventListener('loadedmetadata', onCanPlay);
    });

    // Store the loading promise so concurrent calls share it
    this.loadingPromises.set(key, loadPromise);
    return loadPromise;
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
      // Log playback errors for debugging
      console.warn('Audio playback failed', e);
      // Propagate error to callers
      throw e;
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
