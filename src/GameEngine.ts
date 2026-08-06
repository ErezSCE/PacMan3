/**
 * Fixed‑timestep GameEngine loop.
 *
 * The engine runs an update callback at a constant timestep (default 60 Hz).
 * It uses `requestAnimationFrame` for the render loop, accumulates the real
 * delta time and calls the update callback one or more times per frame to
 * "catch up" when the frame time exceeds the fixed step.
 *
 * The engine also monitors the actual frame time using the Performance API.
 * If the measured FPS drops below a configurable threshold a warning callback
 * (or `console.warn` by default) is invoked.
 *
 * The loop can be paused and resumed – when paused the animation frame is
 * cancelled and the internal state is preserved.
 */
export type UpdateCallback = (dt: number) => void;
export type WarningCallback = (msg: string) => void;
/** Simple logger interface for warning messages */
export interface Logger {
  warn: (msg: string) => void;
}

/**
 * GameEngine
 *
 * Provides a fixed‑timestep game loop with optional FPS monitoring.
 * Public API:
 *  - start(): void – begins the loop
 *  - pause(): void – pauses the loop
 *  - resume(): void – resumes a paused loop
 *  - stop(): void – stops the loop (currently alias for pause)
 *
 * The engine is deliberately lightweight and does not depend on any UI framework.
 */
export class GameEngine {
  
  private readonly updateCallback: UpdateCallback;
  private readonly warningCallback: WarningCallback;
  private readonly timestep: number; // ms per fixed update
  private readonly fpsThreshold: number; // FPS below which we warn

  private isRunning = false;
  private lastTime = 0;
  private accumulated = 0;
  private frameId: number | null = null;
  constructor(
    updateCallback: UpdateCallback,
    options?: {
      warningCallback?: WarningCallback;
      /** Logger for warning messages – defaults to console */
      logger?: Logger;
      /** Fixed update step in milliseconds – defaults to 1000/60 (≈16.666ms) */
      timestep?: number;
      /** FPS threshold for warnings – defaults to 55 FPS */
      fpsThreshold?: number;
    }
  ) {
    this.updateCallback = updateCallback;
    // Use provided warningCallback or logger.warn, defaulting to console.warn
    this.logger = options?.logger ?? console;
    this.warningCallback = options?.warningCallback ?? ((msg) => this.logger.warn(msg));
    this.timestep = options?.timestep ?? 1000 / 60;
    this.fpsThreshold = options?.fpsThreshold ?? 55;
  }

  private logger: Logger;

  /** Start the engine loop. If already running this is a no‑op. */
  start(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    // Schedule the first frame via requestAnimationFrame to avoid a zero‑delta update.
    this.frameId = requestAnimationFrame(this.loop);
  }

  /** Pause the loop – the current state is kept but accumulated time is cleared to avoid catch‑up updates on resume. */
  pause(): void {
    if (!this.isRunning) return;
    this.isRunning = false;
    // Reset accumulated time to prevent a burst of updates when resumed.
    this.accumulated = 0;
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
  }

  /** Resume a paused loop. */
  resume(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    // Reset lastTime so that the first delta after resume is not huge.
    this.lastTime = performance.now();
    // Schedule the first frame after resume via requestAnimationFrame.
    this.frameId = requestAnimationFrame(this.loop);
  }

  /**
   * Stop the engine completely – currently equivalent to `pause()`.
   * This method is provided for future extensions where a full stop may need
   * additional cleanup (e.g., resetting state, releasing resources).
   */
  stop(): void {
    // Fully stop the engine: pause loop and reset timing state.
    this.isRunning = false;
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    // Reset timing state to initial values.
    this.accumulated = 0;
    this.lastTime = 0;
  }

  /** The core loop – called via `requestAnimationFrame`. */
  private loop = (): void => {
    if (!this.isRunning) return;

    const now = performance.now();
    const delta = now - this.lastTime;
    this.lastTime = now;

    // FPS monitoring – warn if below threshold.
    const fps = 1000 / delta;
    if (fps < this.fpsThreshold) {
      // Warning emitted when FPS drops below threshold. Engine continues updating;
      // throttling or additional actions can be added here if desired.
      this.warningCallback(`FPS drop detected: ${fps.toFixed(1)} FPS`);
    }

    this.accumulated += delta;
    while (this.accumulated >= this.timestep) {
      this.updateCallback(this.timestep);
      this.accumulated -= this.timestep;
    }

    this.frameId = requestAnimationFrame(this.loop);
  };
}
