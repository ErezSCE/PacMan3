import React, { useContext } from 'react';
import { UIContext } from './UIContext';

/**
 * Overlay shown when the game is paused.
 * Provides a button to resume the game and an accessible exit button.
 */
export const PauseOverlay: React.FC = () => {
  const { dispatch } = useContext(UIContext);

  const handleResume = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'game' });
  };

  const handleExit = () => {
    // Return to start screen
    dispatch({ type: 'SET_SCREEN', payload: 'start' });
  };

  return (
    <section aria-label="pause overlay" role="dialog">
      <h2>Paused</h2>
      <button type="button" onClick={handleResume}>Resume Game</button>
      <button type="button" onClick={handleExit}>Exit to Main Menu</button>
    </section>
  );
};
