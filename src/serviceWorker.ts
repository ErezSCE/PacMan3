import { logger } from './logger';

export const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    // Register after the page has fully loaded to avoid blocking initial render
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/serviceWorker.js')
        .catch((err) => {
          // eslint-disable-next-line no-console
          logger.error('ServiceWorker registration failed:', err);
        });
    });
  }
};
