export const registerServiceWorker = (): void => {
  if ('serviceWorker' in navigator) {
    // Register after the page has fully loaded to avoid blocking initial render
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/serviceWorker.js')
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error('ServiceWorker registration failed:', err);
        });
    });
  }
};
