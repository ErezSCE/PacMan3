import { GameEngine } from '../GameEngine';

describe('GameEngine state management', () => {
  let engine: GameEngine;
  const dummyUpdate = jest.fn();

  beforeEach(() => {
    dummyUpdate.mockClear();
    engine = new GameEngine(dummyUpdate);
  });

  test('addScore updates score and triggers extra life when threshold crossed', () => {
    const extraLifeCb = jest.fn();
    engine.setOnExtraLife(extraLifeCb);
    // initial lives 3
    expect(engine.getLives()).toBe(3);
    engine.addScore(12000); // crosses one threshold (10000)
    expect(engine.getScore()).toBe(12000);
    expect(engine.getLives()).toBe(4);
    expect(extraLifeCb).toHaveBeenCalledTimes(1);
  });

  test('addScore can grant multiple extra lives', () => {
    const extraLifeCb = jest.fn();
    engine.setOnExtraLife(extraLifeCb);
    engine.addScore(25000); // should grant 2 extra lives (20k) and have 5k leftover
    expect(engine.getScore()).toBe(25000);
    expect(engine.getLives()).toBe(5); // 3 + 2
    expect(extraLifeCb).toHaveBeenCalledTimes(2);
  });

  test('loseLife decreases lives but not below zero', () => {
    engine.loseLife();
    expect(engine.getLives()).toBe(2);
    // lose remaining lives
    engine.loseLife();
    engine.loseLife();
    engine.loseLife(); // should stay at 0
    expect(engine.getLives()).toBe(0);
  });

  test('completeLevel increments level, calls callback, and scales difficulty', () => {
    const levelUpCb = jest.fn();
    engine.setOnLevelUp(levelUpCb);
    const initialTimestep = engine.getTimestep();
    engine.completeLevel();
    expect(engine.getLevel()).toBe(2);
    expect(levelUpCb).toHaveBeenCalledWith(2);
    const expectedTimestep = Math.max(5, initialTimestep * 0.95);
    expect(engine.getTimestep()).toBeCloseTo(expectedTimestep);
  });
});
