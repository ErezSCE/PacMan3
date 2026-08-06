import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UIProvider } from '../ui/UIContext';
import { UIRoot } from '../ui/UIRoot';

/**
 * This test covers the navigation flow between all UI screens:
 * StartScreen -> Countdown -> Game -> PauseOverlay -> Game -> GameOverScreen -> StartScreen
 */

test('full UI navigation flow works correctly', async () => {
  render(
    <UIProvider>
      <UIRoot />
    </UIProvider>
  );

  // StartScreen should be visible initially
  expect(screen.getByRole('heading', { name: /pac‑man 3/i })).toBeInTheDocument();
  const startButton = screen.getByRole('button', { name: /start game/i });
  fireEvent.click(startButton);

  // Countdown should appear
  expect(screen.getByText('3')).toBeInTheDocument();
  // Wait for countdown to finish (3 -> 2 -> 1 -> GO)
  await waitFor(() => expect(screen.getByText('GO')).toBeInTheDocument(), { timeout: 4000 });

  // After GO, Game screen should be displayed after a short delay
  await waitFor(() => expect(screen.getByRole('heading', { name: /game screen/i })).toBeInTheDocument(), { timeout: 2000 });

  // Click Pause button
  const pauseBtn = screen.getByRole('button', { name: /pause/i });
  fireEvent.click(pauseBtn);

  // PauseOverlay should appear
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  const resumeBtn = screen.getByRole('button', { name: /resume game/i });
  fireEvent.click(resumeBtn);

  // Back to Game screen
  expect(screen.getByRole('heading', { name: /game screen/i })).toBeInTheDocument();

  // Trigger Game Over
  const gameOverBtn = screen.getByRole('button', { name: /game over/i });
  fireEvent.click(gameOverBtn);

  // GameOverScreen should appear
  expect(screen.getByRole('heading', { name: /game over/i })).toBeInTheDocument();
  const initialsInput = screen.getByLabelText(/enter your initials/i);
  fireEvent.change(initialsInput, { target: { value: 'ABC' } });
  const submitBtn = screen.getByRole('button', { name: /submit score/i });
  fireEvent.click(submitBtn);

  // After submission, should return to StartScreen
  await waitFor(() => expect(screen.getByRole('heading', { name: /pac‑man 3/i })).toBeInTheDocument());
});
