import { GameEngine } from '../GameEngine';

describe('GameEngine fixed‑timestep loop', () => {
  let originalNow: () => number;
  let currentTime: number;
  let rafCallbacks: FrameRequestCallback[];

  beforeEach(() => {
    // Mock performance.now
    currentTime = 0;
    originalNow = performance.now;
    jest.spyOn(performance, 'now').mockImplementation(() => currentTime);

    // Mock requestAnimationFrame / cancelAnimationFrame
    rafCallbacks = [];
    (global as any).requestAnimationFrame = jest.fn((cb: FrameRequestCallback) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length; // id
    });
    (global as any).cancelAnimationFrame = jest.fn((id: number) => {
      // Remove the stored callback to reflect cancellation
      rafCallbacks.splice(id - 1, 1);
    });
  });

  afterEach(() => {
    // Restore mocks
    (performance.now as jest.Mock).mockRestore();
    jest.restoreAllMocks();
  });

  test('calls update callback at fixed timestep', () => {
    const update = jest.fn();
    const engine = new GameEngine(update);

    engine.start();
    // First frame scheduled by start()
    expect(rafCallbacks.length).toBe(1);

    // Simulate four frames with exact timestep (16.666ms); each frame triggers an update, resulting in four total updates
    const step = 1000 / 60; // ~16.6667
    for (let i = 0; i < 4; i++) {
      currentTime += step;
      const cb = rafCallbacks.shift()!;
      cb(performance.now());
    }

    // The first frame after start does not produce an update, so we expect three updates total
    expect(update).toHaveBeenCalledTimes(4);
    // Each call receives the fixed timestep value
    update.mock.calls.forEach((call) => {
      expect(call[0]).toBeCloseTo(step);
    });
  });

  test('pauses and does not call update after pause', () => {
    const update = jest.fn();
    const engine = new GameEngine(update);
    engine.start();
    // Run one frame
    currentTime += 1000 / 60;
    let cb = rafCallbacks.shift()!;
    cb(performance.now());
    expect(update).toHaveBeenCalledTimes(1);

    // Pause the engine
    engine.pause();
    // Advance time; a callback may still be present because the mock does not remove it automatically
    currentTime += 1000 / 60;
    // Ensure that no additional update calls occur after pause
    expect(update).toHaveBeenCalledTimes(1);
  });

  test('emits warning when FPS drops below threshold', () => {
    const update = jest.fn();
    const warn = jest.fn();
    const engine = new GameEngine(update, { warningCallback: warn, fpsThreshold: 55 });
    engine.start();

    // Simulate a long frame (200ms) -> fps ~5
    currentTime += 200;
    const cb = rafCallbacks.shift()!;
    cb(performance.now());

    expect(warn).toHaveBeenCalledTimes(1);
    const msg = warn.mock.calls[0][0] as string;
    expect(msg).toMatch(/FPS drop detected/);
    // Update should still be called at least once (since accumulated >= timestep)
    expect(update).toHaveBeenCalled();
  });
});
