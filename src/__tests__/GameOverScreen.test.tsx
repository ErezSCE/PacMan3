import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GameOverScreen } from '../ui/GameOverScreen';
import { UIContext } from '../ui/UIContext';
import { Dispatch } from 'react';
import { UIAction } from '../ui/UIContext';

test('GameOverScreen renders input and submit button with type="button"', () => {
  const mockDispatch = jest.fn() as Dispatch<UIAction>;

  render(
    <UIContext.Provider value={{ state: { screen: 'gameover' }, dispatch: mockDispatch }}>
      <GameOverScreen />
    </UIContext.Provider>
  );

  // Input should be present
  const input = screen.getByLabelText(/enter your initials/i);
  expect(input).toBeInTheDocument();

  // Submit button should have type="button"
  const submitBtn = screen.getByRole('button', { name: /submit score/i });
  expect(submitBtn).toHaveAttribute('type', 'button');
});

test('Submitting with non‑empty initials dispatches SET_SCREEN to start', () => {
  const mockDispatch = jest.fn() as Dispatch<UIAction>;

  render(
    <UIContext.Provider value={{ state: { screen: 'gameover' }, dispatch: mockDispatch }}>
      <GameOverScreen />
    </UIContext.Provider>
  );

  const input = screen.getByLabelText(/enter your initials/i);
  fireEvent.change(input, { target: { value: 'XYZ' } });

  const submitBtn = screen.getByRole('button', { name: /submit score/i });
  fireEvent.click(submitBtn);

  expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_SCREEN', payload: 'start' });
});

test('Submitting with empty initials does not dispatch', () => {
  const mockDispatch = jest.fn() as Dispatch<UIAction>;

  render(
    <UIContext.Provider value={{ state: { screen: 'gameover' }, dispatch: mockDispatch }}>
      <GameOverScreen />
    </UIContext.Provider>
  );

  const submitBtn = screen.getByRole('button', { name: /submit score/i });
  fireEvent.click(submitBtn);

  expect(mockDispatch).not.toHaveBeenCalled();
});
