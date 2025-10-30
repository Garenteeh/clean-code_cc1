export function identifyFigure(dice) {
  const sum = dice.reduce((acc, val) => acc + val, 0);
  return { figure: 'Chance', points: sum };
}