import React, { useEffect, useState, useContext } from 'react';
// Note: If any button elements are added to this component in the future, ensure they include type="button" to prevent accidental form submissions.
import { UIContext } from './UIContext';

/**
 * Simple 3‑2‑1‑GO countdown. After displaying "GO" it switches to the game screen.
 */
export interface CountdownProps {
  /**
   * Delay in milliseconds after displaying "GO" before transitioning to the game screen.
   * Allows tests to control timing and avoids flaky behavior.
   */
  goDelayMs?: number;
}

export const Countdown: React.FC<CountdownProps> = ({ goDelayMs = 1000 }) => {
  const { dispatch } = useContext(UIContext);
  const [step, setStep] = useState<number>(3);

  useEffect(() => {
    // Timer logic depends on the current step.
    // When step > 0, decrement every 1000 ms.
    // When step === 0, wait for goDelayMs before navigating to the game screen.

    // Separate timing logic for readability
    // When step > 0, decrement the countdown every second
    // When step === 0, show "GO" for a short duration before transitioning to the game screen
    let timer: ReturnType<typeof setTimeout>;
    if (step > 0) {
      // Continue countdown
      timer = setTimeout(() => setStep(step - 1), 1000);
    } else if (step === 0) {
      // Show GO then transition after a short visible delay (e.g., 1000 ms)
      timer = setTimeout(() => {
        dispatch({ type: 'SET_SCREEN', payload: 'game' });
      }, goDelayMs);
    }
    return () => clearTimeout(timer);
  }, [step, dispatch]);

  const display = step > 0 ? step.toString() : 'GO';

  return (
    <section aria-label="countdown" data-testid="countdown-screen" aria-live="polite">
      <h2>{display}</h2>
    </section>
  );
};
