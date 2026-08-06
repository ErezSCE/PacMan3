import React from 'react';
import { render } from '@testing-library/react';
import { LevelComplete } from '../ui/LevelComplete';
import { UIContext } from '../ui/UIContext';

describe('LevelComplete component', () => {
  it('dispatches countdown after delay', () => {
    jest.useFakeTimers();
    const dispatch = jest.fn();
    const providerValue = { state: { screen: 'game' } as any, dispatch };

    render(
      <UIContext.Provider value={providerValue}>
        <LevelComplete level={3} delayMs={500} />
      </UIContext.Provider>
    );

    // Not called immediately
    expect(dispatch).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(500);

    expect(dispatch).toHaveBeenCalledWith({ type: 'SET_SCREEN', payload: 'countdown' });
    jest.useRealTimers();
  });
});
