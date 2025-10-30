
function identifyFigure(dice, usedFigures = []) {
  const counts = countDiceValues(dice);
  
  if (!usedFigures.includes('YAMS') && hasYams(counts)) {
    return { figure: 'YAMS', points: 50 };
  }
  
  if (!usedFigures.includes('Grande Suite') && hasLargeStraight(dice)) {
    return { figure: 'Grande Suite', points: 40 };
  }
  
  if (!usedFigures.includes('Carré') && hasFourOfAKind(counts)) {
    return { figure: 'Carré', points: 35 };
  }
  
  if (!usedFigures.includes('Full') && hasFull(counts)) {
    return { figure: 'Full', points: 30 };
  }
  
  if (!usedFigures.includes('Brelan') && hasThreeOfAKind(counts)) {
    return { figure: 'Brelan', points: 28 };
  }
  
  const sum = dice.reduce((acc, val) => acc + val, 0);
  return { figure: 'Chance', points: sum };
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
    
    if (result.figure !== 'Chance') {
      usedFigures.push(result.figure);
    }
  }
  
  return totalScore;
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

function hasLargeStraight(dice) {
  const sorted = [...dice].sort((a, b) => a - b);
  const straight1 = [1, 2, 3, 4, 5];
  const straight2 = [2, 3, 4, 5, 6];
  
  return JSON.stringify(sorted) === JSON.stringify(straight1) ||
         JSON.stringify(sorted) === JSON.stringify(straight2);
}
