import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OnScreenControls } from '../OnScreenControls';
import { axe, toHaveNoViolations } from 'jest-axe';

// No need to extend expect here; setupTests already adds the matcher

describe('OnScreenControls component', () => {
  const directions = [
    { dir: 'up', label: 'Move up' },
    { dir: 'down', label: 'Move down' },
    { dir: 'left', label: 'Move left' },
    { dir: 'right', label: 'Move right' },
  ];

  it('renders four directional buttons with correct ARIA labels', () => {
    render(<OnScreenControls />);
    directions.forEach(({ label }) => {
      const btn = screen.getByRole('button', { name: label });
      expect(btn).toBeInTheDocument();
    });
  });

  it('buttons are focusable via keyboard navigation', async () => {
    render(<OnScreenControls />);
    // Tab to the first button
    await userEvent.tab();
    const firstBtn = screen.getByRole('button', { name: directions[0].label });
    expect(firstBtn).toHaveFocus();
    // Tab to the second button
    await userEvent.tab();
    const secondBtn = screen.getByRole('button', { name: directions[1].label });
    expect(secondBtn).toHaveFocus();
  });

  it('has no accessibility violations according to axe', async () => {
    const { container } = render(<OnScreenControls />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
