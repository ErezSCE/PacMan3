import React, { Suspense, lazy } from 'react';

const Game = lazy(() => Promise.resolve().then(() => import('./Game')));

export const App: React.FC = () => {
  return (
    <div className="app">
      <h1>Pac-Man 3</h1>
      <Suspense fallback={<div>Loading game...</div>}>
        <Game />
      </Suspense>
    </div>
  );
};
