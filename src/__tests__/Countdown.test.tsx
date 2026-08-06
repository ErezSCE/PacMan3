import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Countdown } from '../ui/Countdown';
import { UIContext } from '../ui/UIContext';
import { Dispatch } from 'react';
import { UIAction } from '../ui/UIContext';

// Use fake timers for deterministic behavior
jest.useFakeTimers();

test('Countdown displays 3 → 2 → 1 → GO and dispatches transition after goDelayMs', () => {
  const mockDispatch = jest.fn() as Dispatch<UIAction>;

  render(
    <UIContext.Provider value={{ state: { screen: 'countdown' }, dispatch: mockDispatch }}>
      <Countdown goDelayMs={500} />
    </UIContext.Provider>
  );

  // Initial display should be 3
  expect(screen.getByText('3')).toBeInTheDocument();

  // Advance to 2
  act(() => { jest.advanceTimersByTime(1000); });
  expect(screen.getByText('2')).toBeInTheDocument();

  // Advance to 1
  act(() => { jest.advanceTimersByTime(1000); });
  expect(screen.getByText('1')).toBeInTheDocument();

  // Advance to GO
  act(() => { jest.advanceTimersByTime(1000); });
  expect(screen.getByText('GO')).toBeInTheDocument();

  // After goDelayMs (500ms), dispatch should be called to transition to game screen
  act(() => { jest.advanceTimersByTime(500); });
  expect(mockDispatch).toHaveBeenCalledWith({ type: 'SET_SCREEN', payload: 'game' });
});
