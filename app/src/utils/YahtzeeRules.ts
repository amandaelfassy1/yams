import { Dice, ScoreTable } from "../types/Types";

export function calculateOnes(dice: Dice) {
  return [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled]
  .filter(e => e === 1)
  .reduce((acc, curr) => acc + curr, 0);
}

export function calculateTwoes(dice: Dice) {
  return [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled]
  .filter(e => e === 2)
  .reduce((acc, curr) => acc + curr, 0);
}

export function calculateThrees(dice: Dice) {
  return [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled]
  .filter(e => e === 3)
  .reduce((acc, curr) => acc + curr, 0);
}

export function calculateFours(dice: Dice) {
  return [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled]
  .filter(e => e === 4)
  .reduce((acc, curr) => acc + curr, 0);
}

export function calculateFives(dice: Dice) {
  return [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled]
  .filter(e => e === 5)
  .reduce((acc, curr) => acc + curr, 0);
}

export function calculateSixes(dice: Dice) {
  return [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled]
  .filter(e => e === 6)
  .reduce((acc, curr) => acc + curr, 0);
}

export function calculateUpperBonus(scoreTable: ScoreTable) {
  return [scoreTable.ones.score, scoreTable.twos.score, scoreTable.threes.score, scoreTable.fours.score, scoreTable.fives.score, scoreTable.sixes.score]
  .reduce((acc, curr) => acc + curr, 0) >= 63 ? 35 : 0;
}

export function calculateThreeOfKind(dice: Dice) {
  const diceRolled = [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled];
  const setDiceRolled = Array.from(new Set(diceRolled));
  return (setDiceRolled.length <= 3 && setDiceRolled
    .map(
      e => diceRolled.filter(el => el === e).length
    ).some(e => e >= 3)) ? 
  diceRolled.reduce((acc, curr) => acc + curr, 0) : 0;
}

export function calculateFourOfKind(dice: Dice) {
  const diceRolled = [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled];
  const setDiceRolled = Array.from(new Set(diceRolled));
  return (setDiceRolled.length <= 2 && setDiceRolled
    .map(
      e => diceRolled.filter(el => el === e).length
    ).some(e => e >= 4)) ? 
  diceRolled.reduce((acc, curr) => acc + curr, 0) : 0;
}

export function calculateFullHouse(dice: Dice) {
  const diceRolled = [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled].sort((a, b) => a - b);
  const setDiceRolled = Array.from(new Set(diceRolled));
  return (setDiceRolled.length === 2 && diceRolled[0] === diceRolled[1] && diceRolled[3] === diceRolled[4]) ?  25 : 0;
}

export function calculateSmallStraight(dice: Dice) {
  const diceRolled = [...new Set([dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled])].sort((a, b) => a - b);
  if (diceRolled.length < 4) return 0;
  if (diceRolled.length === 4) return (diceRolled.slice(0,-1).map((e,i) => diceRolled[i+1] - e - 1 === 0).every(Boolean)) ? 30 : 0; 
  return (diceRolled.slice(0,-2)
  .map((e,i) => diceRolled[i+1] - e - 1 === 0)
  .every(Boolean) || 
  diceRolled.slice(1,-1)
  .map((e,i) => diceRolled[i+2] - e - 1 === 0)
  .every(Boolean)) ?  30 : 0;
}

export function calculateLargeStraight(dice: Dice) {
  const diceRolled = [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled].sort((a, b) => a - b);
  return (diceRolled.slice(0,-1)
  .map((e,i) => diceRolled[i+1] - e - 1 === 0)
  .every(Boolean)) ?  40 : 0;
}

export function calculateYahtzee(dice: Dice) {
  return [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled]
  .every(e => e === dice.die1.numberRolled) ? 50 : 0;
}

export function calculateChance(dice: Dice) {
  return [dice.die1.numberRolled, dice.die2.numberRolled, dice.die3.numberRolled, dice.die4.numberRolled, dice.die5.numberRolled]
  .reduce((acc, curr) => acc + curr, 0);
}

export function calculateTotalScore(scoreTable: ScoreTable){
  return Object.keys(scoreTable)
  .map((e) => scoreTable[e as keyof ScoreTable].score)
  .reduce((acc, curr) => acc + curr, 0) + calculateUpperBonus(scoreTable);
}