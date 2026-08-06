import React, { useContext } from 'react';
import { UIContext } from './UIContext';
import { StartScreen } from './StartScreen';
import { Countdown } from './Countdown';
import { PauseOverlay } from './PauseOverlay';
import { GameOverScreen } from './GameOverScreen';
import { GameScreen } from './GameScreen';

/**
 * Root component that renders the appropriate UI screen based on the global UI state.
 */
export const UIRoot: React.FC = () => {
  const { state } = useContext(UIContext);

  switch (state.screen) {
    case 'start':
      return <StartScreen />;
    case 'countdown':
      return <Countdown />;
    case 'game':
      return <GameScreen />;
    case 'pause':
      return <PauseOverlay />;
    case 'gameover':
      return <GameOverScreen />;
    default:
      return null;
  }
};
