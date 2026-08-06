
/**
 * Heads‑up display showing the current game status.
 *
 * The component is deliberately presentation‑only – it receives the values
 * via props and does not depend on any global state. This makes it easy to
 * test and reuse in different parts of the UI (e.g., overlay during gameplay
 * or a static preview on the start screen).
 */
import React from 'react';

export interface HUDProps {
  /** Current player score */
  score: number;
  /** Remaining lives */
  lives: number;
  /** Highest score ever achieved (e.g., from IndexedDB) */
  highScore?: number;
}

export const HUD: React.FC<HUDProps> = ({ score, lives, highScore }) => {
  return (
    <section aria-label="hud" className="hud">
      <div aria-label="player-score">Score: {score}</div>
      <div aria-label="player-lives">Lives: {lives}</div>
      {highScore !== undefined && (
        <div aria-label="high-score">High Score: {highScore}</div>
      )}
    </section>
  );
};
