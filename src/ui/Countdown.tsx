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

  // Effect for countdown steps > 0 using setInterval
  useEffect(() => {
    if (step <= 0) {
      return undefined;
    }
    const intervalId = setInterval(() => {
      setStep(prev => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [step]);

  // Effect for handling the "GO" step and dispatching after the delay
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => {
        dispatch({ type: 'SET_SCREEN', payload: 'game' });
      }, goDelayMs);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [step, goDelayMs, dispatch]);

  const display = step > 0 ? step.toString() : 'GO';

  return (
    <section aria-label="countdown" data-testid="countdown-screen" aria-live="polite">
      <h2>{display}</h2>
    </section>
  );
};
