import React, { useContext } from 'react';
import { UIContext } from './UIContext';

/**
 * Simple placeholder for the actual game canvas.
 * Provides buttons to pause the game and to trigger a game‑over state for testing.
 */
export const GameScreen: React.FC = () => {
  const { dispatch } = useContext(UIContext);

  const handlePause = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'pause' });
  };

  const handleGameOver = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'gameover' });
  };

  return (
    <section aria-label="game screen">
      <h1>Game Screen</h1>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleGameOver}>Game Over</button>
    </section>
  );
};
