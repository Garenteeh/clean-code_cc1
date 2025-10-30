export function calculateYamsScore(rolls) {
  if (rolls.length !== 4) {
    throw new Error('Le jeu doit contenir exactement 4 lancers');
  }
  
  let totalScore = 0;
  
  for (const roll of rolls) {
    const result = identifyFigure(roll);
    totalScore += result.points;
  }
  
  return totalScore;
}

function identifyFigure(dice) {
  const counts = countDiceValues(dice);
  
  if (hasYams(counts)) {
    return { figure: 'YAMS', points: 50 };
  }
  
  if (hasFourOfAKind(counts)) {
    return { figure: 'Carré', points: 35 };
  }
  
  if (hasFull(counts)) {
    return { figure: 'Full', points: 30 };
  }
  
  if (hasThreeOfAKind(counts)) {
    return { figure: 'Brelan', points: 28 };
  }
  
  const sum = dice.reduce((acc, val) => acc + val, 0);
  return { figure: 'Chance', points: sum };
}


function countDiceValues(dice) {
  const counts = {};
  dice.forEach(value => {
    counts[value] = (counts[value] || 0) + 1;
  });
  return counts;
}

function hasThreeOfAKind(counts) {
  return Object.values(counts).some(count => count === 3);
}

function hasFourOfAKind(counts) {
  return Object.values(counts).some(count => count === 4);
}

function hasYams(counts) {
  return Object.values(counts).some(count => count === 5);
}

function hasFull(counts) {
  const values = Object.values(counts).sort();
  return values.length === 2 && values[0] === 2 && values[1] === 3;
}