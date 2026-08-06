import React, { useContext } from 'react';
import { UIContext } from './UIContext';

/**
 * Start screen showing the game title, a placeholder high‑score list and a start button.
 */
export const StartScreen: React.FC = () => {
  const { dispatch } = useContext(UIContext);

  const handleStart = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'countdown' });
  };

  return (
    <section aria-label="start screen">
      <h1>Pac‑Man 3</h1>
      {/* Placeholder high‑score list – real data will be wired later */}
      <ul aria-label="high score list">
        <li>AAA – 10000</li>
        <li>BBB – 8000</li>
        <li>CCC – 6000</li>
      </ul>
      <button onClick={handleStart}>Start Game</button>
    </section>
  );
};
