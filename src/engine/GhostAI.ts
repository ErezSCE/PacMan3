/**
 * Minimal Ghost AI state machine implementation for testing purposes.
 * This module defines the possible ghost states and provides a simple class
 * to transition between them. The real game would have timers and complex
 * logic; here we only implement the core state transitions required by the
 * unit tests.
 */

export type GhostState = 'scatter' | 'chase' | 'frightened' | 'eyes';

type TransitionEvent =
  | 'START_CHASE'
  | 'START_SCATTER'
  | 'POWER_PELLET_EATEN'
  | 'GHOST_EATEN'
  | 'RESET';

/**
 * GhostAI manages the current state of a ghost. The `transition` method
 * updates the state based on a simple set of rules:
 * - START_CHASE   -> chase
 * - START_SCATTER -> scatter
 * - POWER_PELLET_EATEN -> frightened
 * - GHOST_EATEN   -> eyes
 * - RESET         -> scatter (initial state)
 */
/**
 * GhostAI implements a simple finite‑state machine for ghost behavior.
 * NOTE: This implementation only supports explicit transitions via the
 * `transition` method. Real Pac‑Man ghosts also transition automatically
 * (e.g., frightened → chase after a timer expires). Those timed transitions
 * are not modeled here. If such behavior is required, a method like
 * `handleTimerExpiry()` could be added to trigger the appropriate event.
 */
export class GhostAI {
  private state: GhostState = 'scatter';

  public getState(): GhostState {
    return this.state;
  }

  private stateChangeListeners: Set<(newState: GhostState) => void> = new Set();

  /** Subscribe to state changes. Returns an unsubscribe function. */
  public subscribeStateChange(listener: (newState: GhostState) => void): () => void {
    this.stateChangeListeners.add(listener);
    return () => {
      this.stateChangeListeners.delete(listener);
    };
  }

  private notifyStateChange(): void {
    this.stateChangeListeners.forEach((listener) => {
      try {
        listener(this.state);
      } catch (e) {
        // Log listener errors for observability
        console.error('GhostAI stateChange listener error:', e);
        // Continue notifying other listeners
      }
    });
  }

  private isValidTransition(event: TransitionEvent): boolean {
    // Define allowed transitions based on current state
    const allowed: Record<GhostState, TransitionEvent[]> = {
      scatter: ['START_CHASE', 'POWER_PELLET_EATEN', 'RESET'],
      chase: ['START_SCATTER', 'POWER_PELLET_EATEN', 'RESET'],
      frightened: ['START_CHASE', 'START_SCATTER', 'GHOST_EATEN', 'RESET'],
      eyes: ['START_CHASE', 'START_SCATTER', 'RESET'],
    };
    return allowed[this.state].includes(event);
  }

  public transition(event: TransitionEvent): void {
    if (!this.isValidTransition(event)) {
      throw new Error(`Invalid transition ${event} from state ${this.state}`);
    }
    switch (event) {
      case 'START_CHASE':
        this.state = 'chase';
        break;
      case 'START_SCATTER':
        this.state = 'scatter';
        break;
      case 'POWER_PELLET_EATEN':
        this.state = 'frightened';
        break;
      case 'GHOST_EATEN':
        this.state = 'eyes';
        break;
      case 'RESET':
        this.state = 'scatter';
        break;
      default:
        // Exhaustive check – should never happen
        const _exhaustiveCheck: never = event;
        throw new Error(`Unhandled transition event: ${_exhaustiveCheck}`);
    }
    this.notifyStateChange();
  }
}

