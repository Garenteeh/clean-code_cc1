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

  it('devrait identifier une Grande Suite (1-5)', () => {
    const lancers = [
      [1, 2, 3, 4, 5], // Grande Suite 40
      [2, 2, 2, 5, 5], // Full 30
      [3, 3, 3, 1, 2], // Brelan 28
      [1, 2, 3, 4, 6]  // Chance 16
    ];
    const result = calculateYamsScore(lancers);
    expect(result).toBe(114); 
  });

  it('devrait identifier une Grande Suite (2-6)', () => {
    const lancers = [
      [2, 3, 4, 5, 6], // Grande Suite 40
      [4, 4, 4, 4, 1], // Carré 35
      [2, 2, 2, 5, 5], // Full 30
      [1, 2, 3, 4, 6]  // Chance 16
    ];
    const result = calculateYamsScore(lancers);
    expect(result).toBe(121); 
  });

  it('devrait calculer le score pour 4 lancers', () => {
    const rolls = [
      [1, 2, 3, 4, 5], // Grande Suite 40
      [5, 5, 5, 5, 5], // YAMS 50
      [3, 3, 3, 1, 2], // Brelan 28
      [1, 2, 3, 4, 6]  // Chance 16
    ];
    const result = calculateYamsScore(rolls);
    expect(result).toBe(134);
  });

  it('devrait éviter de réutiliser une figure déjà utilisée', () => {
    const rolls = [
      [1, 1, 1, 2, 2], // Full 30
      [1, 1, 1, 2, 2], // Brelan 28 (Full déjà pris)
      [1, 1, 1, 2, 2], // Chance 7 (Full et Brelan déjà pris)
      [5, 5, 5, 5, 5]  // YAMS 50 
    ];
    const result = calculateYamsScore(rolls);
    expect(result).toBe(115); 
  });

  it('devrait lancer une erreur si le nombre de lancers est incorrect', () => {
    const rolls = [
      [1, 1, 1, 2, 2], 
      [1, 1, 1, 2, 2], 
      [1, 1, 1, 2, 2], 
    ];
    expect(() => calculateYamsScore(rolls)).toThrowError('Le jeu doit contenir exactement 4 lancers');
  });
});