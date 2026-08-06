import { GameEngine } from '../GameEngine';

describe('GameEngine pause and resume behavior', () => {

  let currentTime: number;
  let rafCallbacks: FrameRequestCallback[];
  let requestSpy: jest.SpyInstance;
  let cancelSpy: jest.SpyInstance;
  let originalNow: () => number;

  beforeEach(() => {
    // Mock performance.now
    currentTime = 0;
    originalNow = performance.now;
    jest.spyOn(performance, 'now').mockImplementation(() => currentTime);

    // Mock requestAnimationFrame / cancelAnimationFrame
    rafCallbacks = [];
    // Mock requestAnimationFrame / cancelAnimationFrame using jest.spyOn
    requestSpy = jest.spyOn(global as any, 'requestAnimationFrame').mockImplementation((cb: FrameRequestCallback) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length; // simple id
    });
    cancelSpy = jest.spyOn(global as any, 'cancelAnimationFrame').mockImplementation((id: number) => {
      // remove the callback to simulate cancellation
      rafCallbacks.splice(id - 1, 1);
    });
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

  test('resume continues updates after pause without catch‑up burst', () => {
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
    const callsBefore = requestSpy.mock.calls.length;
    engine.resume();
    // A new frame should be scheduled (call count should increase)
    expect(requestSpy.mock.calls.length).toBeGreaterThan(callsBefore);
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
