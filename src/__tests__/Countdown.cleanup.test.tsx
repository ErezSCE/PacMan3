import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Countdown } from '../ui/Countdown';
import { UIContext } from '../ui/UIContext';
import { Dispatch } from 'react';
import { UIAction } from '../ui/UIContext';

jest.useFakeTimers();

test('Countdown cleans up timers on unmount', () => {
  const mockDispatch = jest.fn() as Dispatch<UIAction>;

  const { unmount } = render(
    <UIContext.Provider value={{ state: { screen: 'countdown' }, dispatch: mockDispatch }}>
      <Countdown goDelayMs={500} />
    </UIContext.Provider>
  );

  // Advance to GO step (3 -> 2 -> 1 -> GO)
  act(() => { jest.advanceTimersByTime(3000); });
  expect(screen.getByText('GO')).toBeInTheDocument();

  // Unmount before goDelayMs expires
  unmount();

  // Advance timers past goDelayMs; dispatch should not be called because cleanup cleared timer
  act(() => { jest.advanceTimersByTime(1000); });
  expect(mockDispatch).not.toHaveBeenCalled();
});
