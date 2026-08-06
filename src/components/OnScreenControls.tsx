import React from 'react';
import './OnScreenControls.css';

import inputHandler, { Direction } from '../input/InputHandler';

interface Props {
  /**
   * Callback when a direction button is activated (clicked or activated via keyboard).
   */
  onDirection?: (dir: Direction) => void;
}

/**
 * On‑screen directional controls for touch devices.
 * Each button is focusable and has a visible focus indicator for accessibility.
 * ARIA labels describe the action for screen readers.
 */
export const OnScreenControls: React.FC<Props> = ({ onDirection }) => {
  const handleClick = (dir: Direction) => {
    // Emit direction via InputHandler singleton
    inputHandler.press(dir);
    if (onDirection) onDirection(dir);
  };

  const directions: { dir: Direction; label: string; symbol: string }[] = [
    { dir: 'up', label: 'Move up', symbol: '↑' },
    { dir: 'down', label: 'Move down', symbol: '↓' },
    { dir: 'left', label: 'Move left', symbol: '←' },
    { dir: 'right', label: 'Move right', symbol: '→' },
  ];

  return (
    <div className="on-screen-controls" role="group" aria-label="Directional controls">
      {directions.map(({ dir, label, symbol }) => (
        <button
          key={dir}
          type="button"
          className={`control-button control-${dir}`}
          aria-label={label}
          onClick={() => handleClick(dir)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Space') {
              e.preventDefault();
              handleClick(dir);
            }
          }}
        >
          {symbol}
        </button>
      ))}
    </div>
  );
};
