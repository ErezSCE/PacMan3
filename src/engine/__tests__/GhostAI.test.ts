import { GhostAI, GhostState } from '../GhostAI';

describe('GhostAI state machine', () => {
  test('initial state is scatter', () => {
    const ai = new GhostAI();
    expect(ai.getState()).toBe('scatter');
  });

  test('valid transition changes state and notifies listeners', () => {
    const ai = new GhostAI();
    const listener = jest.fn();
    const unsubscribe = ai.subscribeStateChange(listener);
    // Transition to chase
    ai.transition('START_CHASE');
    expect(ai.getState()).toBe('chase');
    expect(listener).toHaveBeenCalledWith('chase');
    // Unsubscribe and ensure no further calls
    unsubscribe();
    ai.transition('START_SCATTER');
    expect(ai.getState()).toBe('scatter');
    expect(listener).toHaveBeenCalledTimes(1); // no new call after unsubscribe
  });

  test('invalid transition throws error', () => {
    const ai = new GhostAI();
    // From initial scatter, trying GHOST_EATEN is invalid
    expect(() => ai.transition('GHOST_EATEN' as any)).toThrowError(
      /Invalid transition GHOST_EATEN from state scatter/
    );
  });
});
