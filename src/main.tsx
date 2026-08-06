
import ReactDOM from 'react-dom/client';
import { Root } from './index.tsx';
import { registerServiceWorker } from './serviceWorker';
import { logger } from './logger';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element with id "root" not found');
}
const root = ReactDOM.createRoot(rootElement);
root.render(<Root />);

// Register the service worker for offline support
try {
  registerServiceWorker();
} catch (err: unknown) {
  logger.error('Service worker registration failed:', err);
}
