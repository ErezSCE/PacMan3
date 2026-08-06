import React, { useState, useContext } from 'react';
import { UIContext } from './UIContext';

/**
 * Screen displayed when the game ends.
 * Allows the player to enter their initials and submit the score.
 * After submission the UI returns to the start screen.
 */
export const GameOverScreen: React.FC = () => {
  const { dispatch } = useContext(UIContext);
  const [initials, setInitials] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitials(e.target.value);
  };

  const handleSubmit = () => {
    // Validate that initials are not empty before proceeding.
    if (initials.trim() === '') {
      // Could show an error message; for now we simply do nothing.
      return;
    }
    // In a real app we would persist the score here.
    // For the UI flow we simply navigate back to the start screen.
    dispatch({ type: 'SET_SCREEN', payload: 'start' });
  };

  return (
    <section aria-label="game over screen">
      <h1>Game Over</h1>
      <label htmlFor="initials-input">Enter your initials</label>
      <input
        id="initials-input"
        type="text"
        value={initials}
        onChange={handleChange}
        aria-label="Enter your initials"
      />
      <button type="button" onClick={handleSubmit}>Submit Score</button>
    </section>
  );
};
