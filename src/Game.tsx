import React, { useEffect } from 'react';

import { OnScreenControls } from './components/OnScreenControls';
import inputHandler, { Direction } from './input/InputHandler';

const Game: React.FC = () => {

  useEffect(() => {
    const handler = (dir: Direction) => {
      // Direction state removed; handler retained for side‑effects if needed.
    };
    inputHandler.init();
    inputHandler.subscribe(handler);
    return () => {
      inputHandler.unsubscribe(handler);
      inputHandler.destroy();
    };
  }, []);

  return (
    <section className="game-wrapper">
      <OnScreenControls />
      <div data-testid="game-component">
        <p>Game component loaded</p>
      </div>
    </section>
  );
};

export default Game;
