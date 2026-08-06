/**
 * Tests for the Service Worker script logic.
 * Uses a mocked `self` object to capture event listeners and cache interactions.
 */

declare const global: any;

// Mock the Cache API
const mockCache = {
  addAll: jest.fn().mockResolvedValue(undefined),
};
const mockCaches = {
  open: jest.fn().mockResolvedValue(mockCache),
  match: jest.fn().mockResolvedValue(undefined),
};

// Mock the ServiceWorkerGlobalScope (self)
const addEventListenerMock = jest.fn();
const mockSelf = {
  addEventListener: addEventListenerMock,
  caches: mockCaches,
};

// Replace the global self with our mock before importing the script
beforeAll(() => {
  (global as any).self = mockSelf;
});

afterAll(() => {
  delete (global as any).self;
});

test('service worker registers install and fetch event listeners', async () => {
  // Import the service worker script after setting up the mock
  // The script registers listeners on the mocked `self`
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../public/serviceWorker.js');

  // Verify that addEventListener was called for both events
  expect(addEventListenerMock).toHaveBeenCalledTimes(2);
  expect(addEventListenerMock).toHaveBeenCalledWith('install', expect.any(Function));
  expect(addEventListenerMock).toHaveBeenCalledWith('fetch', expect.any(Function));
});

test('install event caches essential assets', async () => {
  // Import the script to register listeners again (reset mock calls)
  addEventListenerMock.mockClear();
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('../../public/serviceWorker.js');

  // Capture the install handler function passed to addEventListener
  const installHandler = addEventListenerMock.mock.calls.find(
    (call) => call[0] === 'install'
  )?.[1];
  expect(typeof installHandler).toBe('function');

  // Mock the event object with waitUntil
  const waitUntilMock = jest.fn();
  const mockEvent = { waitUntil: waitUntilMock };

  // Invoke the install handler
  // @ts-ignore – we are calling the handler directly
  installHandler(mockEvent);

  // Ensure caches.open was called with the expected cache name
  expect(mockCaches.open).toHaveBeenCalledWith('static-cache');
  // Ensure the URLs to cache were added
  expect(mockCache.addAll).toHaveBeenCalledWith([
    '/',
    '/index.html',
    '/offline.html',
  ]);
  // Ensure waitUntil was called with a Promise
  expect(waitUntilMock).toHaveBeenCalled();
});
