import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { registerServiceWorker } from './serviceWorker';

const rootElement = document.getElementById('root');
if (!rootElement) {
  // In test environments or non-browser contexts, the root element may be absent.
  // Log a warning and continue to register the Service Worker.
  // eslint-disable-next-line no-console
  console.warn('Root element not found');
  // Register Service Worker even if UI cannot render.
  registerServiceWorker();
  // Exit early to avoid rendering errors.
  // eslint-disable-next-line @typescript-eslint/no-useless-return
  return;
}
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Register Service Worker for offline support
registerServiceWorker();
