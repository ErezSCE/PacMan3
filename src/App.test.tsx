import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App component', () => {
  it('renders the title', () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /pac-man 3/i });
    expect(heading).toBeInTheDocument();
  });
});
