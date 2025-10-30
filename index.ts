
const FIGURES = {
  YAMS: 'YAMS',
  GRANDE_SUITE: 'Grande Suite',
  CARRE: 'Carré',
  FULL: 'Full',
  BRELAN: 'Brelan',
  CHANCE: 'Chance'
};

const POINTS = {
  [FIGURES.YAMS]: 50,
  [FIGURES.GRANDE_SUITE]: 40,
  [FIGURES.CARRE]: 35,
  [FIGURES.FULL]: 30,
  [FIGURES.BRELAN]: 28
};

function identifyFigure(dice, usedFigures = []) {
  const counts = countDiceValues(dice);
  
  if (!isFigureUsed(FIGURES.YAMS, usedFigures) && hasYams(counts)) {
    return createFigureResult(FIGURES.YAMS);
  }
  
  if (!isFigureUsed(FIGURES.GRANDE_SUITE, usedFigures) && hasLargeStraight(dice)) {
    return createFigureResult(FIGURES.GRANDE_SUITE);
  }
  
  if (!isFigureUsed(FIGURES.CARRE, usedFigures) && hasFourOfAKind(counts)) {
    return createFigureResult(FIGURES.CARRE);
  }
  
  if (!isFigureUsed(FIGURES.FULL, usedFigures) && hasFull(counts)) {
    return createFigureResult(FIGURES.FULL);
  }
  
  if (!isFigureUsed(FIGURES.BRELAN, usedFigures) && hasThreeOfAKind(counts)) {
    return createFigureResult(FIGURES.BRELAN);
  }
  
  return createChanceResult(dice);
}

export function calculateYamsScore(rolls) {
  if (rolls.length !== 4) {
    throw new Error('Le jeu doit contenir exactement 4 lancers');
  }
  
  let totalScore = 0;
  const usedFigures = [];
  
  for (const roll of rolls) {
    const result = identifyFigure(roll, usedFigures);
    totalScore += result.points;
    
    if (shouldTrackFigure(result.figure)) {
      usedFigures.push(result.figure);
    }
  }
  
  return totalScore;
}

function isFigureUsed(figure, usedFigures) {
  return usedFigures.includes(figure);
}

function createFigureResult(figure) {
  return { figure, points: POINTS[figure] };
}

function createChanceResult(dice) {
  const sum = calculateDiceSum(dice);
  return { figure: FIGURES.CHANCE, points: sum };
}

function calculateDiceSum(dice) {
  return dice.reduce((acc, val) => acc + val, 0);
}

function shouldTrackFigure(figure) {
  return figure !== FIGURES.CHANCE;
}

function countDiceValues(dice) {
  const counts = {};
  dice.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

function hasThreeOfAKind(counts) {
  return hasCountOfKind(counts, 3);
}

function hasFourOfAKind(counts) {
  return hasCountOfKind(counts, 4);
}

function hasYams(counts) {
  return hasCountOfKind(counts, 5);
}

function hasCountOfKind(counts, targetCount) {
  return Object.values(counts).some(count => count === targetCount);
}

function hasFull(counts) {
  const values = Object.values(counts).sort();
  return values.length === 2 && values[0] === 2 && values[1] === 3;
}

function hasLargeStraight(dice) {
  const sorted = [...dice].sort((a, b) => a - b);
  const validStraights = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6]
  ];
  
  return validStraights.some(straight => 
    JSON.stringify(sorted) === JSON.stringify(straight)
  );
}