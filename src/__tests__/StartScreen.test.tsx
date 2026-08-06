import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { StartScreen } from '../ui/StartScreen';
import { UIContext } from '../ui/UIContext';
import { Dispatch } from 'react';
import { UIAction } from '../ui/UIContext';

test('StartScreen renders title, high score list, and dispatches on start button click', () => {
  const mockDispatch = jest.fn() as Dispatch<UIAction>;

  render(
    <UIContext.Provider value={{ state: { screen: 'start' }, dispatch: mockDispatch }}>
      <StartScreen />
    </UIContext.Provider>
  );

  // Title
  expect(screen.getByRole('heading', { name: /pac‑man 3/i })).toBeInTheDocument();

  // High score list items
  const list = screen.getByRole('list', { name: /high score list/i });
  expect(list).toBeInTheDocument();
  expect(list.children.length).toBeGreaterThanOrEqual(3);

  // Start button dispatches SET_SCREEN to 'countdown'
  const startButton = screen.getByRole('button', { name: /start game/i });
  fireEvent.click(startButton);
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_SCREEN', payload: 'countdown' });
});
