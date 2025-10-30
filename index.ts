export function identifyFigure(dice) {
  const counts = countDiceValues(dice);
  
  if (hasFourOfAKind(counts)) {
    return { figure: 'Carré', points: 35 };
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