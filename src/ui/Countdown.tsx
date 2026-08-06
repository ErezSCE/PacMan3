import React, { useEffect, useState, useContext } from 'react';
import { UIContext } from './UIContext';

/**
 * Simple 3‑2‑1‑GO countdown. After displaying "GO" it switches to the game screen.
 */
export const Countdown: React.FC = () => {
  const { dispatch } = useContext(UIContext);
  const [step, setStep] = useState<number>(3);

  useEffect(() => {
    if (step > 0) {
      // Continue countdown
      const timer = setTimeout(() => setStep(step - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (step === 0) {
      // Show GO then transition immediately (next tick)
      const goTimer = setTimeout(() => {
        dispatch({ type: 'SET_SCREEN', payload: 'game' });
      }, 0);
      return () => clearTimeout(goTimer);
    }
  }, [step, dispatch]);

  const display = step > 0 ? step.toString() : 'GO';

  return (
    <section aria-label="countdown" data-testid="countdown-screen">
      <h2>{display}</h2>
    </section>
  );
};
