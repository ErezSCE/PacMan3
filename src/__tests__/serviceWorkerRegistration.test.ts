import { jest } from '@jest/globals';

// Mock the serviceWorker module
jest.mock('../serviceWorker', () => ({
  registerServiceWorker: jest.fn(),
}));

// Import the mocked function after mocking
import { registerServiceWorker } from '../serviceWorker';

// Import the main entry point which should invoke registerServiceWorker
document.body.innerHTML = '<div id="root"></div>';
import '../main.tsx';

describe('Service Worker registration', () => {
  it('should call registerServiceWorker during app initialization', () => {
    expect(registerServiceWorker).toHaveBeenCalled();
  });
});
