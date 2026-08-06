import { render, screen } from '@testing-library/react';
import { App } from './App';
import React from 'react';

describe('App lazy loading', () => {
  it('shows loading fallback and then loads Game component', async () => {
    render(<App />);
    // Initially fallback text should be present
    expect(screen.getByText(/loading game.../i)).toBeInTheDocument();
    // Wait for the lazy-loaded component to appear
    const game = await screen.findByTestId('game-component');
    expect(game).toBeInTheDocument();
  });
});
