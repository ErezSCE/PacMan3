import React, { useEffect, useContext } from 'react';
import { UIContext } from './UIContext';

/**
 * Transition screen shown after a level is cleared.
 *
 * Props:
 *  - level: the level that has just been completed.
 *  - delayMs: how long to show the screen before moving to the next countdown.
 */
export interface LevelCompleteProps {
  level: number;
  /** Delay before transitioning to the next screen (default 2000 ms). */
  delayMs?: number;
}

export const LevelComplete: React.FC<LevelCompleteProps> = ({ level, delayMs = 2000 }) => {
  const { dispatch } = useContext(UIContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      // After the transition, go to the countdown for the next level.
      dispatch({ type: 'SET_SCREEN', payload: 'countdown' });
    }, delayMs);
    return () => clearTimeout(timer);
  }, [dispatch, delayMs]);

  return (
    <section aria-label="level complete" className="level-complete">
      <h2>Level {level} Complete!</h2>
    </section>
  );
};
