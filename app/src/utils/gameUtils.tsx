export const rollLimit = 3;

export const rollDice = (): number[] => {
  return Array.from({ length: 5 }, () => Math.floor(Math.random() * 6) + 1);
};

export const calculateScore = (dice: number[]): number => {
  const counts: { [key: number]: number } = {};
  dice.forEach((value) => {
    counts[value] = counts[value] ? counts[value] + 1 : 1;
  });

  if (Object.values(counts).some((count) => count === 5)) {
    return 3;
  }

  if (Object.values(counts).some((count) => count === 4)) {
    return 2;
  }

  const uniqueValues = Object.keys(counts).length;
  if (uniqueValues === 2 && Object.values(counts).every((count) => count === 2)) {
    return 1;
  }

  return 0;
};
