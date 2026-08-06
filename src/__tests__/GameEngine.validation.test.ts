import { GameEngine } from '../GameEngine';

describe('GameEngine constructor and addScore validation', () => {
  const dummyUpdate = jest.fn();

  test('throws if extraLifeThreshold is zero', () => {
    expect(() => new GameEngine(dummyUpdate, { extraLifeThreshold: 0 })).toThrow(TypeError);
  });

  test('throws if extraLifeThreshold is negative', () => {
    expect(() => new GameEngine(dummyUpdate, { extraLifeThreshold: -5000 })).toThrow(TypeError);
  });

  test('throws if extraLifeThreshold is non‑finite', () => {
    expect(() => new GameEngine(dummyUpdate, { extraLifeThreshold: Infinity })).toThrow(TypeError);
  });

  test('addScore throws on negative points', () => {
    const engine = new GameEngine(dummyUpdate);
    expect(() => engine.addScore(-10)).toThrow(TypeError);
  });

  test('addScore throws on NaN points', () => {
    const engine = new GameEngine(dummyUpdate);
    expect(() => engine.addScore(NaN)).toThrow(TypeError);
  });

  test('addScore throws on Infinity points', () => {
    const engine = new GameEngine(dummyUpdate);
    expect(() => engine.addScore(Infinity)).toThrow(TypeError);
  });
});
