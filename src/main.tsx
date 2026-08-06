import React from 'react';
import ReactDOM from 'react-dom/client';
import { Root } from './index';
import { registerServiceWorker } from './serviceWorker';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}
const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);

// Register the service worker for offline support
try {
  registerServiceWorker();
} catch (err) {
  // eslint-disable-next-line no-console
  console.error('Service worker registration failed:', err);
}
