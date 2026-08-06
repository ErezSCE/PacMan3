import React from 'react';
import { App } from './App';

/**
 * Entry point component that wires together the top‑level application.
 * It can be extended in the future to include providers, routers, etc.
 */
export const Root: React.FC = () => {
  return <App />;
};
