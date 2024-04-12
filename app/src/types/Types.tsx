export interface Die {
  numberRolled: number,
  isLocked: boolean
}

export interface Dice {
  numberRerolls: number,
  die1: Die,
  die2: Die,
  die3: Die,
  die4: Die,
  die5: Die
}

export interface Score {
  isUsed: boolean,
  score: number
}

export interface ScoreYahtzee {
  isUsed: boolean,
  score: number,
  numberOfYahtzees: number
}

export interface ScoreTable {
  ones: Score,
  twos: Score,
  threes: Score,
  fours: Score,
  fives: Score,
  sixes: Score,
  threeOfKind: Score,
  fourOfKind: Score,
  fullHouse: Score,
  smallStraight: Score,
  largeStraight: Score,
  chance: Score,
  yahtzee: ScoreYahtzee
}

export interface ReducerState {
  roundNumber: number,
  dice: Dice,
  scoreTable: ScoreTable
}

export interface ReducerAction {
  type: ReducerActionTypes,
  payloadScore?: Score,
  payloadScoreYahtzee?: ScoreYahtzee,
  payloadDice?: Array<number>
}

export enum ReducerActionTypes {
  UPDATE_ONES,
  UPDATE_TWOS,
  UPDATE_THREES,
  UPDATE_FOURS,
  UPDATE_FIVES,
  UPDATE_SIXES,
  UPDATE_THREE_OF_KIND,
  UPDATE_FOUR_OF_KIND,
  UPDATE_FULL_HOUSE,
  UPDATE_SMALL_STRAIGHT,
  UPDATE_LARGE_STRAIGHT,
  UPDATE_YAHTZEE,
  UPDATE_CHANCE,
  LOCK_DIE1,
  LOCK_DIE2,
  LOCK_DIE3,
  LOCK_DIE4,
  LOCK_DIE5,
  UPDATE_DICE,
  RESET
}

export interface TextListItem {
  primary: string,
  secondary: string
} 