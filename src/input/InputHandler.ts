/**
 * InputHandler module
 * Normalises keyboard (arrow keys, WASD), swipe gestures, and on‑screen button inputs
 * into directional commands for the GameEngine.
 */

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

type Callback = (direction: Direction) => void;

class InputHandler {
  private callbacks: Set<Callback> = new Set();
  private touchStartX: number | null = null;
  private touchStartY: number | null = null;
  private readonly swipeThreshold = 30; // pixels

  private boundKeyDown = this.handleKeyDown.bind(this);
  private boundTouchStart = this.handleTouchStart.bind(this);
  private boundTouchEnd = this.handleTouchEnd.bind(this);

  constructor() {
    // bindings are set in property initializers
  }


  private initialized: boolean = false;

  /** Initialise event listeners */
  public init(): void {
    if (this.initialized) {
      return; // idempotent guard
    }
    window.addEventListener('keydown', this.boundKeyDown);
    window.addEventListener('touchstart', this.boundTouchStart);
    window.addEventListener('touchend', this.boundTouchEnd);
    this.initialized = true;
  }

  /** Clean up event listeners added by init(). */
  public destroy(): void {
    if (!this.initialized) {
      return; // idempotent guard
    }
    window.removeEventListener('keydown', this.boundKeyDown);
    window.removeEventListener('touchstart', this.boundTouchStart);
    window.removeEventListener('touchend', this.boundTouchEnd);
    this.initialized = false;
  }

  /** Subscribe to direction events */
  public subscribe(cb: Callback): void {
    this.callbacks.add(cb);
  }

  /** Unsubscribe from direction events */
  public unsubscribe(cb: Callback): void {
    this.callbacks.delete(cb);
  }

  /** Called by on‑screen button components */
  public press(direction: Direction): void {
    // Guard against emitting 'none' direction which carries no meaning
    if (direction === 'none') {
      return;
    }
    this.notify(direction);
  }

  private notify(direction: Direction): void {
    this.callbacks.forEach((cb) => cb(direction));
  }

  private handleKeyDown(e: KeyboardEvent): void {
    // Prevent default scrolling behavior for arrow keys
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if (arrowKeys.includes(e.key)) {
      e.preventDefault();
    }
    const key = e.key.toLowerCase();
    let direction: Direction = 'none';
    switch (key) {
      case 'arrowup':
      case 'w':
        direction = 'up';
        break;
      case 'arrowdown':
      case 's':
        direction = 'down';
        break;
      case 'arrowleft':
      case 'a':
        direction = 'left';
        break;
      case 'arrowright':
      case 'd':
        direction = 'right';
        break;
      default:
        return; // ignore other keys
    }
    this.notify(direction);
  }

  private handleTouchStart(e: TouchEvent): void {
    if (e.touches.length !== 1) return;
    const touch = e.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
  }

  private handleTouchEnd(e: TouchEvent): void {
    if (this.touchStartX === null || this.touchStartY === null) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - this.touchStartX;
    const dy = touch.clientY - this.touchStartY;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    let direction: Direction = 'none';
    if (absDx > absDy && absDx > this.swipeThreshold) {
      direction = dx > 0 ? 'right' : 'left';
    } else if (absDy > absDx && absDy > this.swipeThreshold) {
      direction = dy > 0 ? 'down' : 'up';
    }
    if (direction !== 'none') {
      this.notify(direction);
    }
    this.touchStartX = null;
    this.touchStartY = null;
  }
}

// Export a singleton instance for the whole app
const inputHandler = new InputHandler();
export default inputHandler;
export type { Direction };
