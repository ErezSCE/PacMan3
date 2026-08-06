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
export class GhostAI {
  private state: GhostState = 'scatter';

  public getState(): GhostState {
    return this.state;
  }

  public transition(event: TransitionEvent): void {
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
        // No-op for unknown events
        break;
    }
  }
}
