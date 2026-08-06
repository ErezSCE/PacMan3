import { GameEngine } from '../GameEngine';

describe('GameEngine pause and resume behavior', () => {
  let originalNow: () => number;
  let currentTime: number;
  let rafCallbacks: FrameRequestCallback[];
  let requestSpy: jest.SpyInstance;
  let cancelSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock performance.now
    currentTime = 0;
    originalNow = performance.now;
    jest.spyOn(performance, 'now').mockImplementation(() => currentTime);

    // Mock requestAnimationFrame / cancelAnimationFrame
    rafCallbacks = [];
    // Save original functions
    const originalRequest = (global as any).requestAnimationFrame;
    const originalCancel = (global as any).cancelAnimationFrame;
    // Mock requestAnimationFrame / cancelAnimationFrame
    requestSpy = jest.fn((cb: FrameRequestCallback) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length; // simple id
    });
    cancelSpy = jest.fn((id: number) => {
      // remove the callback to simulate cancellation
      rafCallbacks.splice(id - 1, 1);
    });
    (global as any).requestAnimationFrame = requestSpy;
    (global as any).cancelAnimationFrame = cancelSpy;
  });

  afterEach(() => {
    (performance.now as jest.Mock).mockRestore();
    requestSpy.mockRestore();
    cancelSpy.mockRestore();
  });

  test('does not call update after pause', () => {
    const update = jest.fn();
    const engine = new GameEngine(update);
    engine.start();
    // Simulate one frame
    const step = 1000 / 60;
    currentTime += step;
    let cb = rafCallbacks.shift()!;
    cb(performance.now());
    expect(update).toHaveBeenCalledTimes(1);

    // Pause the engine
    engine.pause();
    expect(cancelSpy).toHaveBeenCalled();

    // Advance time and attempt to invoke any remaining callbacks (there should be none)
    currentTime += step;
    // If a callback is still present, invoking it should not trigger update because isRunning is false
    if (rafCallbacks.length) {
      const leftover = rafCallbacks.shift()!;
      leftover(performance.now());
    }
    expect(update).toHaveBeenCalledTimes(1);
  });

  test('resume continues updates after pause', () => {
    const update = jest.fn();
    const engine = new GameEngine(update);
    engine.start();
    const step = 1000 / 60;
    // First frame
    currentTime += step;
    let cb = rafCallbacks.shift()!;
    cb(performance.now());
    expect(update).toHaveBeenCalledTimes(1);

    // Pause
    engine.pause();
    expect(cancelSpy).toHaveBeenCalled();

    // Resume
    engine.resume();
    // A new frame should be scheduled
    expect(requestSpy).toHaveBeenCalledTimes(3); // start loop schedule, first frame schedule, resume schedule
    // Simulate next frame after resume
    currentTime += step;
    cb = rafCallbacks.shift()!;
    cb(performance.now());
    expect(update).toHaveBeenCalledTimes(2);
  });

  test('does not emit warning when FPS is above threshold', () => {
    const update = jest.fn();
    const warn = jest.fn();
    const engine = new GameEngine(update, { warningCallback: warn, fpsThreshold: 55 });
    engine.start();
    // Simulate two fast frames (10ms each) -> total > timestep, should trigger update
    const fastDelta = 10;
    // First frame
    currentTime += fastDelta;
    let cb = rafCallbacks.shift()!;
    cb(performance.now());
    // Second frame
    currentTime += fastDelta;
    cb = rafCallbacks.shift()!;
    cb(performance.now());
    expect(warn).not.toHaveBeenCalled();
    expect(update).toHaveBeenCalled();
  });
});
