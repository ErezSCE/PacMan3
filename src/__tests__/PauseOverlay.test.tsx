import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PauseOverlay } from '../ui/PauseOverlay';
import { UIContext } from '../ui/UIContext';
import { Dispatch } from 'react';
import { UIAction } from '../ui/UIContext';

test('PauseOverlay buttons have type="button" and dispatch correct actions', () => {
  const mockDispatch = jest.fn() as Dispatch<UIAction>;

  render(
    <UIContext.Provider value={{ state: { screen: 'pause' }, dispatch: mockDispatch }}>
      <PauseOverlay />
    </UIContext.Provider>
  );

  const resumeBtn = screen.getByRole('button', { name: /resume game/i });
  expect(resumeBtn).toHaveAttribute('type', 'button');
  fireEvent.click(resumeBtn);
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_SCREEN', payload: 'game' });

  const exitBtn = screen.getByRole('button', { name: /exit to main menu/i });
  expect(exitBtn).toHaveAttribute('type', 'button');
  fireEvent.click(exitBtn);
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_SCREEN', payload: 'start' });
});
