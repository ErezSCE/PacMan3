import React, { useContext, useState } from 'react';
import { UIContext } from './UIContext';
import { MuteToggle } from '../components/MuteToggle';

/**
 * Simple placeholder for the actual game canvas.
 * Provides buttons to pause the game and to trigger a game‑over state for testing.
 * Includes a mute toggle UI component.
 */
export const GameScreen: React.FC = () => {
  const { dispatch } = useContext(UIContext);
  const [showLevelComplete, setShowLevelComplete] = useState(false);

  const handlePause = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'pause' });
  };

  const handleGameOver = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'gameover' });
  };

  const handleLevelComplete = () => {
    setShowLevelComplete(true);
  };

  return (
    <section aria-label="game screen">
      <h1>Game Screen</h1>
      <button type="button" onClick={handlePause}>Pause</button>
      <button type="button" onClick={handleGameOver}>Game Over</button>
      <button type="button" onClick={handleLevelComplete}>Complete Level</button>
      {showLevelComplete && <LevelComplete level={1} />}
    </section>
  );
};
