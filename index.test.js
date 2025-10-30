import { describe, it, expect } from 'vitest';
import { identifyFigure } from './yames.js';

describe('Yams - Identification des figures', () => {
  it('devrait identifier une chance (pas de figure)', () => {
    const dice = [1, 2, 3, 4, 6];
    const result = identifyFigure(dice);
    expect(result).toEqual({ figure: 'Chance', points: 16 });
  });
});