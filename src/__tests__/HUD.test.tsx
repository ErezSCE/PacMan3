import React from 'react';
import { render, screen } from '@testing-library/react';
import { HUD } from '../ui/HUD';

describe('HUD component', () => {
  it('renders score, lives and high score', () => {
    render(<HUD score={12345} lives={2} highScore={20000} />);

    const scoreEl = screen.getByLabelText('player-score');
    const livesEl = screen.getByLabelText('player-lives');
    const highScoreEl = screen.getByLabelText('high-score');

    expect(scoreEl).toHaveTextContent('Score: 12345');
    expect(livesEl).toHaveTextContent('Lives: 2');
    expect(highScoreEl).toHaveTextContent('High Score: 20000');
  });
});
