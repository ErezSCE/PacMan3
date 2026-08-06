import React from 'react';

import { OnScreenControls } from './components/OnScreenControls';

const Game: React.FC = () => {
  return (
    <>
      <OnScreenControls />
    <div data-testid="game-component">
      <p>Game component loaded</p>
    </div>
    </>
  );
};

export default Game;
