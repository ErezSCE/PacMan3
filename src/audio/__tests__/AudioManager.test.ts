let audioManager: any;

// Mock HTMLAudioElement to avoid real network requests
class MockAudio {
  src: string = '';
  muted: boolean = false;
  currentTime: number = 0;
  paused: boolean = true;
  // Event listeners storage
  private listeners: Record<string, (() => void)[]> = {};

  addEventListener(event: string, cb: () => void) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(cb);
  }
  removeEventListener(event: string, cb: () => void) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((fn) => fn !== cb);
  }
  // Simulate canplaythrough event
  triggerCanPlay() {
    this.listeners['canplaythrough']?.forEach((cb) => cb());
  }
  // Simulate error event
  triggerError() {
    this.listeners['error']?.forEach((cb) => cb());
  }
  // Simulate play returning a resolved promise
  async play() {
    this.paused = false;
    return Promise.resolve();
  }
  pause() {
    this.paused = true;
  }
}

// Replace global Audio with mock constructor that records instances
const audioInstances: MockAudio[] = [];
// @ts-ignore
global.Audio = jest.fn((src: string) => {
  const instance = new MockAudio();
  instance.src = src;
  audioInstances.push(instance);
  return instance;
}) as any;

import { AudioKey } from '../AudioManager';

describe('AudioManager', () => {
  const testKey: AudioKey = 'test-sound';
  const testSrc = '/sounds/test.mp3';

  beforeEach(() => {
    jest.resetModules();
    // Re-import fresh singleton after reset
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require('../AudioManager');
    audioManager = mod.default;
    // Clear recorded instances
    audioInstances.length = 0;
  });

  test('loads and caches audio lazily', async () => {
    const loadPromise = audioManager.load(testKey, testSrc);
    // At this point a MockAudio instance should be created but not resolved yet
    expect(audioInstances).toHaveLength(1);
    const mockAudioInstance = audioInstances[0];
    // Simulate canplaythrough event to resolve load
    mockAudioInstance.triggerCanPlay();
    const audio = await loadPromise;
    expect(audio.src).toBe(testSrc);
    // Subsequent load should return cached instance immediately
    const cached = await audioManager.load(testKey, testSrc);
    expect(cached).toBe(audio);
  });

  test('play loads audio if not loaded and plays it', async () => {
    const playPromise = audioManager.play(testKey, testSrc);
    expect(audioInstances).toHaveLength(1);
    const mockAudioInstance = audioInstances[0];
    mockAudioInstance.triggerCanPlay();
    await playPromise;
    expect(mockAudioInstance.paused).toBe(false);
  });

  test('play throws when src missing and audio not loaded', async () => {
    await expect(audioManager.play(testKey)).rejects.toThrow('Audio "test-sound" not loaded and no src supplied');
  });

  test('mute state propagates to loaded audio', async () => {
    const loadPromise = audioManager.load(testKey, testSrc);
    const mockAudioInstance = audioInstances[0];
    mockAudioInstance.triggerCanPlay();
    await loadPromise;
    audioManager.setMute(true);
    expect(mockAudioInstance.muted).toBe(true);
    audioManager.setMute(false);
    expect(mockAudioInstance.muted).toBe(false);
  });

  test('load rejects and clears cache on error', async () => {
    const loadPromise = audioManager.load(testKey, testSrc);
    expect(audioInstances).toHaveLength(1);
    const mockAudioInstance = audioInstances[0];
    // Simulate error event
    mockAudioInstance.triggerError();
    await expect(loadPromise).rejects.toBeDefined();
    // After error, cache should not have the audio; loading again creates new instance
    const secondLoadPromise = audioManager.load(testKey, testSrc);
    expect(audioInstances).toHaveLength(2); // new audio element created
    const secondMock = audioInstances[1];
    secondMock.triggerCanPlay();
    const audio2 = await secondLoadPromise;
    expect(audio2).toBeDefined();
    expect(audio2.src).toBe(testSrc);
  });
});
