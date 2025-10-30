import { describe, it, expect } from 'vitest';
import { calculateYamsScore } from './index.js';


describe('Yams - Calcul du score avec 4 lancers', () => {
  it('devrait calculer le score pour 4 lancers', () => {
    const rolls = [
      [1, 2, 3, 4, 5], // Grande Suite = 40
      [5, 5, 5, 5, 5], // YAMS = 50
      [3, 3, 3, 1, 2], // Brelan = 28
      [1, 2, 3, 4, 6]  // Chance = 16
    ];
    const result = calculateYamsScore(rolls);
    expect(result).toBe(134);
  });

  it('devrait éviter de réutiliser une figure déjà utilisée', () => {
    const rolls = [
      [1, 1, 1, 2, 2], // Full = 30
      [1, 1, 1, 2, 2], // Brelan = 28 (Full déjà pris)
      [1, 1, 1, 2, 2], // Chance = 8 (Full et Brelan déjà pris)
      [5, 5, 5, 5, 5]  // YAMS = 50
    ];
    const result = calculateYamsScore(rolls);
    expect(result).toBe(115); // 30 + 28 + 8 + 50
  });

  it('devrait prioriser YAMS sur Carré', () => {
    const rolls = [
      [3, 3, 3, 3, 3], // YAMS = 50 (pas Carré)
      [4, 4, 4, 4, 1], // Carré = 35
      [2, 2, 3, 4, 5], // Chance = 16
      [1, 2, 3, 4, 5]  // Grande Suite = 40
    ];
    const result = calculateYamsScore(rolls);
    expect(result).toBe(141); // 50 + 35 + 16 + 40
  });

  it('devrait prioriser Carré sur Brelan', () => {
    const rolls = [
      [6, 6, 6, 6, 2], // Carré = 35
      [3, 3, 3, 1, 2], // Brelan = 28
      [2, 3, 4, 5, 6], // Grande Suite = 40
      [1, 1, 1, 2, 2]  // Full = 30
    ];
    const result = calculateYamsScore(rolls);
    expect(result).toBe(133); // 35 + 28 + 40 + 30
  });

  it('devrait prioriser Full sur Brelan', () => {
    const rolls = [
      [4, 4, 4, 1, 1], // Full = 30
      [3, 3, 3, 2, 5], // Brelan = 28
      [2, 3, 4, 5, 6], // Grande Suite = 40
      [6, 6, 6, 6, 2]  // Carré = 35
    ];
    const result = calculateYamsScore(rolls);
    expect(result).toBe(133); // 30 + 28 + 40 + 35
  });

  it('devrait gérer correctement plusieurs Chances', () => {
    const rolls = [
      [1, 2, 3, 4, 6], // Chance = 16
      [1, 2, 3, 5, 6], // Chance = 17
      [2, 3, 4, 5, 1], // Grande Suite = 40
      [1, 2, 4, 5, 6]  // Chance = 18
    ];
    const result = calculateYamsScore(rolls);
    expect(result).toBe(91); // 16 + 17 + 40 + 18
  });

  it('devrait rejeter moins ou plus de 4 lancers', () => {
    const rolls3 = [[1,2,3,4,5], [1,2,3,4,5], [1,2,3,4,5]];
    expect(() => calculateYamsScore(rolls3)).toThrow('Le jeu doit contenir exactement 4 lancers');
    
    const rolls5 = [[1,2,3,4,5], [1,2,3,4,5], [1,2,3,4,5], [1,2,3,4,5], [1,2,3,4,5]];
    expect(() => calculateYamsScore(rolls5)).toThrow('Le jeu doit contenir exactement 4 lancers');
  });
});