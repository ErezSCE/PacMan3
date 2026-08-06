import { GameEngine } from '../GameEngine';

describe('GameEngine reset functionality', () => {
  const dummyUpdate = jest.fn();

  test('reset clears score, lives, level and extra lives earned', () => {
    const engine = new GameEngine(dummyUpdate);
    // Simulate earning extra lives
    engine.addScore(25000); // should give 2 extra lives
    expect(engine.getLives()).toBe(5);
    expect(engine.getScore()).toBe(25000);
    // Reset
    // @ts-ignore accessing private method for test purposes
    (engine as any).reset();
    expect(engine.getLives()).toBe(3);
    expect(engine.getScore()).toBe(0);
    expect(engine.getLevel()).toBe(1);
    // extraLivesEarned should be reset, so adding another threshold should give only one extra life now
    engine.addScore(12000);
    expect(engine.getLives()).toBe(4);
  });

  test('constructor validates timestep and fpsThreshold', () => {
    expect(() => new GameEngine(dummyUpdate, { timestep: 0 })).toThrow(TypeError);
    expect(() => new GameEngine(dummyUpdate, { timestep: -5 })).toThrow(TypeError);
    expect(() => new GameEngine(dummyUpdate, { fpsThreshold: 0 })).toThrow(TypeError);
    expect(() => new GameEngine(dummyUpdate, { fpsThreshold: -10 })).toThrow(TypeError);
  });
});
