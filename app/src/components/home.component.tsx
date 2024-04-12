import { Box, Button, CssBaseline } from '@mui/material';
import { Reducer, useReducer } from 'react';
import { ReducerAction, ReducerActionTypes, ReducerState } from '../types/Types';
import DiceSection from '../game/DiceSection';
import ScoreTableSection from '../game/ScoreTableSection';
import { calculateTotalScore } from '../utils/YahtzeeRules';

const initialValue: ReducerState = {
  roundNumber: 1,
  dice: {
    numberRerolls: 3,
    die1: { numberRolled: 1, isLocked: false },
    die2: { numberRolled: 2, isLocked: false },
    die3: { numberRolled: 3, isLocked: false },
    die4: { numberRolled: 4, isLocked: false },
    die5: { numberRolled: 5, isLocked: false }
  },
  scoreTable: {
    ones: { isUsed: false, score: 0 },
    twos: { isUsed: false, score: 0 },
    threes: { isUsed: false, score: 0 },
    fours: { isUsed: false, score: 0 },
    fives: { isUsed: false, score: 0 },
    sixes: { isUsed: false, score: 0 },
    threeOfKind: { isUsed: false, score: 0 },
    fourOfKind: { isUsed: false, score: 0 },
    fullHouse: { isUsed: false, score: 0 },
    smallStraight: { isUsed: false, score: 0 },
    largeStraight: { isUsed: false, score: 0 },
    yahtzee: { isUsed: false, score: 0, numberOfYahtzees: 0 },
    chance: { isUsed: false, score: 0 },
  }
}

const reducer: Reducer<ReducerState, ReducerAction> = (state: ReducerState, action: ReducerAction) => {
  const updateScore = (e: 'ones' | 'twos' | 'threes' | 'fours' | 'fives' | 'sixes' | 'threeOfKind' | 'fourOfKind' | 'fullHouse' | 'smallStraight' | 'largeStraight' | 'chance') => {
    return (!state.scoreTable[e].isUsed && action.payloadScore) ?
      {
        roundNumber: state.roundNumber + 1,
        dice: {
          numberRerolls: 3,
          die1: { ...state.dice.die1, isLocked: false },
          die2: { ...state.dice.die2, isLocked: false },
          die3: { ...state.dice.die3, isLocked: false },
          die4: { ...state.dice.die4, isLocked: false },
          die5: { ...state.dice.die5, isLocked: false }
        },
        scoreTable: {
          ...state.scoreTable,
          [e]: { isUsed: true, score: action.payloadScore.score }
        }
      } : state;
  }
  const updateScoreYahtzee = () => {
    return (action.payloadScoreYahtzee) ?
      {
        roundNumber: state.roundNumber + 1,
        dice: {
          numberRerolls: 3,
          die1: { ...state.dice.die1, isLocked: false },
          die2: { ...state.dice.die2, isLocked: false },
          die3: { ...state.dice.die3, isLocked: false },
          die4: { ...state.dice.die4, isLocked: false },
          die5: { ...state.dice.die5, isLocked: false }
        },
        scoreTable: {
          ...state.scoreTable,
          yahtzee: {
            isUsed: true,
            score: action.payloadScoreYahtzee.score,
            numberOfYahtzees: state.scoreTable.yahtzee.numberOfYahtzees + 1
          }
        }
      } : state;
  }
  const lockDie = (e: 'die1' | 'die2' | 'die3' | 'die4' | 'die5') => {
    return { ...state, dice: { ...state.dice, [e]: { ...state.dice[e], isLocked: !state.dice[e].isLocked } } }
  }
  const updateDice = () => {
    return {
      ...state,
      dice: {
        numberRerolls: state.dice.numberRerolls - 1,
        die1: { ...state.dice.die1, numberRolled: (state.dice.die1.isLocked) ? state.dice.die1.numberRolled : Math.floor(Math.random() * 6) + 1 },
        die2: { ...state.dice.die2, numberRolled: (state.dice.die2.isLocked) ? state.dice.die2.numberRolled : Math.floor(Math.random() * 6) + 1 },
        die3: { ...state.dice.die3, numberRolled: (state.dice.die3.isLocked) ? state.dice.die3.numberRolled : Math.floor(Math.random() * 6) + 1 },
        die4: { ...state.dice.die4, numberRolled: (state.dice.die4.isLocked) ? state.dice.die4.numberRolled : Math.floor(Math.random() * 6) + 1 },
        die5: { ...state.dice.die5, numberRolled: (state.dice.die5.isLocked) ? state.dice.die5.numberRolled : Math.floor(Math.random() * 6) + 1 }
      }
    };
  }
  const reset = () => {
    return {
      roundNumber: 1,
      scoreTable: initialValue.scoreTable,
      dice: {
        numberRerolls: 3,
        die1: { ...state.dice.die1, isLocked: false },
        die2: { ...state.dice.die2, isLocked: false },
        die3: { ...state.dice.die3, isLocked: false },
        die4: { ...state.dice.die4, isLocked: false },
        die5: { ...state.dice.die5, isLocked: false }
      }
    }
  }

  // prevent using the rolled dice multiple times
  if (state.dice.numberRerolls === 3 && !(action.type === ReducerActionTypes.UPDATE_DICE || action.type === ReducerActionTypes.RESET))
    return state;

  switch (action.type) {
    case ReducerActionTypes.UPDATE_DICE: return updateDice();
    case ReducerActionTypes.UPDATE_ONES: return updateScore('ones');
    case ReducerActionTypes.UPDATE_TWOS: return updateScore('twos');
    case ReducerActionTypes.UPDATE_THREES: return updateScore('threes');
    case ReducerActionTypes.UPDATE_FOURS: return updateScore('fours');
    case ReducerActionTypes.UPDATE_FIVES: return updateScore('fives');
    case ReducerActionTypes.UPDATE_SIXES: return updateScore('sixes');
    case ReducerActionTypes.UPDATE_THREE_OF_KIND: return updateScore('threeOfKind');
    case ReducerActionTypes.UPDATE_FOUR_OF_KIND: return updateScore('fourOfKind');
    case ReducerActionTypes.UPDATE_FULL_HOUSE: return updateScore('fullHouse');
    case ReducerActionTypes.UPDATE_SMALL_STRAIGHT: return updateScore('smallStraight');
    case ReducerActionTypes.UPDATE_LARGE_STRAIGHT: return updateScore('largeStraight');
    case ReducerActionTypes.UPDATE_CHANCE: return updateScore('chance');
    case ReducerActionTypes.UPDATE_YAHTZEE: return updateScoreYahtzee();
    case ReducerActionTypes.LOCK_DIE1: return lockDie('die1');
    case ReducerActionTypes.LOCK_DIE2: return lockDie('die2');
    case ReducerActionTypes.LOCK_DIE3: return lockDie('die3');
    case ReducerActionTypes.LOCK_DIE4: return lockDie('die4');
    case ReducerActionTypes.LOCK_DIE5: return lockDie('die5');
    case ReducerActionTypes.RESET: return reset();
    default: { return state; }
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <Box sx={{
      height: '100vh',
      width: '100vw',
    }}>
      <CssBaseline />
      <Box
        sx={{
          width: '80%',
          maxWidth: '1200px',
          minWidth: '300px',
          minHeight: '800px',
          overflow: 'hidden',
          borderRadius: '5px',
          boxShadow: '0 19px 38px rgba(0,0,0,.3),0 15px 12px rgba(0,0,0,.1)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          '@media (max-height: 900px)': {
            top: '40px',
            transform: 'translateX(-50%)',
            marginBottom: '80px',
          },
          '@media (max-width: 1000px)': {
            marginBottom: '80px',
            top: '40px',
            transform: 'translateX(-50%)'
          },
          '@media (max-width: 300px)': {
            left: 0,
            transform: 'none',
          },
        }}>
        <DiceSection state={state} dispatch={dispatch} />
        <ScoreTableSection state={state} dispatch={dispatch} />
        <Box sx={{
          flexBasis: '100px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          backgroundColor: 'white'
        }
        }>
          <Box sx={{
            borderBottom: 'solid purple 2px',
            fontSize: 'h5.fontSize',
            fontWeight: '200',
          }}>
            TOTAL SCORE: {calculateTotalScore(state.scoreTable)}
          </Box>
          <Button variant="contained"
            onClick={() => dispatch({ type: ReducerActionTypes.RESET })}
            sx={{
              background: 'linear-gradient(90deg,#91eae4,#7f7fd5,#91eae4)',
              backgroundSize: '200% auto',
              transition: '0.4s',
              '&:hover': {
                backgroundPosition: 'right center',
              }
            }}>
            Try Again
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: '1px', }
      } />
    </Box>
  );
}

export default Home;
