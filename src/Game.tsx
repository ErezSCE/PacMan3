import React, { useEffect, useState } from 'react';

import { OnScreenControls } from './components/OnScreenControls';
import inputHandler, { Direction } from './input/InputHandler';

const Game: React.FC = () => {
  const [direction, setDirection] = useState<Direction | null>(null);

  useEffect(() => {
    const handler = (dir: Direction) => {
      setDirection(dir);
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
