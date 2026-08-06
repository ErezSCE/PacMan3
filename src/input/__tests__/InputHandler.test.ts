import inputHandler, { Direction } from '../InputHandler';

// Mock Touch class for jsdom environment
class MockTouch {
  identifier: number;
  target: EventTarget;
  clientX: number;
  clientY: number;
  constructor(init: { identifier: number; target: EventTarget; clientX: number; clientY: number }) {
    this.identifier = init.identifier;
    this.target = init.target;
    this.clientX = init.clientX;
    this.clientY = init.clientY;
  }
}
// Assign to global if not present
if (typeof (global as any).Touch === 'undefined') {
  (global as any).Touch = MockTouch;
}


describe('InputHandler', () => {
  let callback: jest.Mock<void, [Direction]>;

  beforeEach(() => {
    // Reset callbacks and ensure fresh state
    callback = jest.fn();
    inputHandler.subscribe(callback);
    inputHandler.init();
  });

  afterEach(() => {
    inputHandler.unsubscribe(callback);
    // Clean up listeners via destroy method
    inputHandler.destroy();
  });

  test('should notify on ArrowUp key', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    window.dispatchEvent(event);
    expect(callback).toHaveBeenCalledWith('up');
  });

  test('should notify on WASD keys', () => {
    const wEvent = new KeyboardEvent('keydown', { key: 'w' });
    const aEvent = new KeyboardEvent('keydown', { key: 'a' });
    const sEvent = new KeyboardEvent('keydown', { key: 's' });
    const dEvent = new KeyboardEvent('keydown', { key: 'd' });
    window.dispatchEvent(wEvent);
    window.dispatchEvent(aEvent);
    window.dispatchEvent(sEvent);
    window.dispatchEvent(dEvent);
    expect(callback).toHaveBeenNthCalledWith(1, 'up');
    expect(callback).toHaveBeenNthCalledWith(2, 'left');
    expect(callback).toHaveBeenNthCalledWith(3, 'down');
    expect(callback).toHaveBeenNthCalledWith(4, 'right');
  });

  test('should ignore unrelated keys', () => {
    const event = new KeyboardEvent('keydown', { key: 'Enter' });
    window.dispatchEvent(event);
    expect(callback).not.toHaveBeenCalled();
  });

  test('should detect swipe right', () => {
    const touchStart = new TouchEvent('touchstart', {
      touches: [new Touch({ identifier: 0, target: window, clientX: 10, clientY: 50 })],
    });
    const touchEnd = new TouchEvent('touchend', {
      changedTouches: [new Touch({ identifier: 0, target: window, clientX: 100, clientY: 55 })],
    });
    window.dispatchEvent(touchStart);
    window.dispatchEvent(touchEnd);
    expect(callback).toHaveBeenCalledWith('right');
  });

  test('should detect swipe up', () => {
    const touchStart = new TouchEvent('touchstart', {
      touches: [new Touch({ identifier: 0, target: window, clientX: 50, clientY: 100 })],
    });
    const touchEnd = new TouchEvent('touchend', {
      changedTouches: [new Touch({ identifier: 0, target: window, clientX: 55, clientY: 20 })],
    });
    window.dispatchEvent(touchStart);
    window.dispatchEvent(touchEnd);
    expect(callback).toHaveBeenCalledWith('up');
  });

  test('should detect swipe left', () => {
    const touchStart = new TouchEvent('touchstart', {
      touches: [new Touch({ identifier: 0, target: window, clientX: 100, clientY: 50 })],
    });
    const touchEnd = new TouchEvent('touchend', {
      changedTouches: [new Touch({ identifier: 0, target: window, clientX: 10, clientY: 55 })],
    });
    window.dispatchEvent(touchStart);
    window.dispatchEvent(touchEnd);
    expect(callback).toHaveBeenCalledWith('left');
  });

  test('should detect swipe down', () => {
    const touchStart = new TouchEvent('touchstart', {
      touches: [new Touch({ identifier: 0, target: window, clientX: 50, clientY: 10 })],
    });
    const touchEnd = new TouchEvent('touchend', {
      changedTouches: [new Touch({ identifier: 0, target: window, clientX: 55, clientY: 100 })],
    });
    window.dispatchEvent(touchStart);
    window.dispatchEvent(touchEnd);
    expect(callback).toHaveBeenCalledWith('down');
  });

  test('press method should notify direction', () => {
    inputHandler.press('left');
    expect(callback).toHaveBeenCalledWith('left');
  });

  test('init called twice should not duplicate events', () => {
    // Call init again (idempotent)
    inputHandler.init();
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    window.dispatchEvent(event);
    // Should be called only once despite two init calls
    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith('right');
  });
});
