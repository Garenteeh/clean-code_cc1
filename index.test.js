import { describe, it, expect } from 'vitest';
import { calculateYamsScore } from './index.js';

describe('Yams', () => {
  it('devrait calculer le score pour 4 lancers avec différentes figures', () => {
    const lancers = [
      [1, 2, 3, 4, 6], // Chance 16
      [3, 3, 3, 1, 2], // Brelan 28
      [4, 4, 4, 4, 1], // Carré 35
      [5, 5, 5, 5, 5]  // YAMS 50
    ];
    const result = calculateYamsScore(lancers);
    expect(result).toBe(129);
  });

  it('devrait identifier un Full dans un lancé', () => {
    const lancers = [
      [2, 2, 2, 5, 5], // Full 30
      [1, 2, 3, 4, 6], // Chance 16
      [3, 3, 3, 1, 2], // Brelan 28
      [4, 4, 4, 4, 1]  // Carré 35
    ];
    const result = calculateYamsScore(lancers);
    expect(result).toBe(109); 
  });
});
