import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

export type UIScreen =
  | 'start'
  | 'countdown'
  | 'game'
  | 'pause'
  | 'gameover';

export interface UIState {
  screen: UIScreen;
}

export type UIAction =
  | { type: 'SET_SCREEN'; payload: UIScreen };

const initialState: UIState = {
  screen: 'start',
};

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.payload };
    default:
      return state;
  }
}

interface UIContextProps {
  state: UIState;
  dispatch: Dispatch<UIAction>;
}

export const UIContext = createContext<UIContextProps>({
  state: initialState,
  dispatch: () => undefined,
});

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);
  return (
    <UIContext.Provider value={{ state, dispatch }}>
      {children}
    </UIContext.Provider>
  );
};
