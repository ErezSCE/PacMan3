import React, { useEffect, useState, useContext } from 'react';
// Note: If any button elements are added to this component in the future, ensure they include type="button" to prevent accidental form submissions.
import { UIContext } from './UIContext';

/**
 * Simple 3‑2‑1‑GO countdown. After displaying "GO" it switches to the game screen.
 */
export const Countdown: React.FC = () => {
  const { dispatch } = useContext(UIContext);
  const [step, setStep] = useState<number>(3);

  useEffect(() => {
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
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [step, dispatch]);

  const display = step > 0 ? step.toString() : 'GO';

  return (
    <section aria-label="countdown" data-testid="countdown-screen">
      <h2>{display}</h2>
    </section>
  );
};
