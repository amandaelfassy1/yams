import { Box, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Dice, ReducerAction, ReducerActionTypes, ReducerState, TextListItem } from "../types/Types";
import { textListItems } from "../utils/Data";
import { calculateUpperBonus, calculateYahtzee, calculateThreeOfKind, calculateOnes, calculateTwoes, calculateThrees, calculateFours, calculateFives, calculateSixes, calculateFourOfKind, calculateFullHouse, calculateSmallStraight, calculateChance, calculateLargeStraight } from "../utils/YahtzeeRules";

export default function ScoreTableSection(props: { state: ReducerState, dispatch: React.Dispatch<ReducerAction> }) {
  const generateListItem = (scoreName: 'ones' | 'twos' | 'threes' | 'fours' | 'fives' | 'sixes' | 'threeOfKind' | 'fourOfKind' | 'fullHouse' | 'smallStraight' | 'largeStraight' | 'chance',
    reducerActionTypes: ReducerActionTypes,
    functionCalcuateScore: (dice: Dice) => number) => {
    const calcuatedScore = functionCalcuateScore(props.state.dice);
    const score = props.state.scoreTable[scoreName].score;
    const isUsed = props.state.scoreTable[scoreName].isUsed;
    const textListItem: TextListItem = textListItems[scoreName];
    return (
      <ListItem disablePadding onClick={() => props.dispatch({
        type: reducerActionTypes,
        payloadScore: {
          isUsed: true,
          score: calcuatedScore
        }
      })}>
        <ListItemButton disabled={isUsed} divider>
          <ListItemText primary={textListItem.primary} secondary={window.innerWidth < 600 ? null : textListItem.secondary} />
          <ListItemText primary={isUsed ? score : calcuatedScore}
            sx={{
              textAlign: 'right',
              color: isUsed ? 'black' : calcuatedScore > 0 ? 'purple' : 'brown'
            }} />
        </ListItemButton>
      </ListItem>)
  }

  const generateListItemUpperBonus = () => {
    const calcuatedScore = calculateUpperBonus(props.state.scoreTable);

    const textListItem: TextListItem = textListItems['upperBonus'];
    return (
      <ListItem disablePadding>
        <ListItemButton disabled divider>
          <ListItemText primary={textListItem.primary} secondary={window.innerWidth < 600 ? null : textListItem.secondary} />
          <ListItemText primary={calcuatedScore}
            sx={{
              textAlign: 'right',
            }} />
        </ListItemButton>
      </ListItem>)
  }

  const generateListItemYahtzee = () => {
    const calcuatedScore = calculateYahtzee(props.state.dice);
    const score = props.state.scoreTable.yahtzee.score;
    const isUsed = props.state.scoreTable.yahtzee.isUsed;
    const textListItem: TextListItem = textListItems['yahtzee'];
    return (
      <ListItem disablePadding onClick={() => props.dispatch({
        type: ReducerActionTypes.UPDATE_YAHTZEE,
        payloadScore: {
          isUsed: true,
          score: calcuatedScore
        }
      })}>
        <ListItemButton disabled={isUsed} divider onClick={() => props.dispatch({
          type: ReducerActionTypes.UPDATE_YAHTZEE,
          payloadScoreYahtzee: {
            isUsed: true,
            score: calcuatedScore,
            numberOfYahtzees: 1
          }
        })}>
          <ListItemText primary={textListItem.primary} secondary={window.innerWidth < 600 ? null : textListItem.secondary} />
          <ListItemText primary={isUsed ? score : calcuatedScore}
            sx={{
              textAlign: 'right',
              color: isUsed ? 'black' : calcuatedScore > 0 ? 'purple' : 'brown'
            }} />
        </ListItemButton>
      </ListItem>)
  }

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: 'white',
      '@media (max-width: 1000px)': {
        overflow: 'auto',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }
    }}>
      <Box sx={{
        width: '40%',
        padding: '10px',
        '@media (max-width: 1000px)': {
          width: '80%'
        }
      }}>
        <Box sx={{
          borderBottom: 'solid purple 2px',
          fontSize: 'h5.fontSize',
          fontWeight: '200',
          textAlign: 'center',
        }}>
          Upper
        </Box>
        <List dense>
          {generateListItem('ones', ReducerActionTypes.UPDATE_ONES, calculateOnes)}
          {generateListItem('twos', ReducerActionTypes.UPDATE_TWOS, calculateTwoes)}
          {generateListItem('threes', ReducerActionTypes.UPDATE_THREES, calculateThrees)}
          {generateListItem('fours', ReducerActionTypes.UPDATE_FOURS, calculateFours)}
          {generateListItem('fives', ReducerActionTypes.UPDATE_FIVES, calculateFives)}
          {generateListItem('sixes', ReducerActionTypes.UPDATE_SIXES, calculateSixes)}
          {generateListItemUpperBonus()}
        </List>
      </Box>
      <Box sx={{
        width: '40%',
        padding: '10px',
        '@media (max-width: 1000px)': {
          width: '80%'
        }
      }} >
        <Box sx={{
          borderBottom: 'solid purple 2px',
          fontSize: 'h5.fontSize',
          fontWeight: '200',
          textAlign: 'center',
        }}>
          Lower
        </Box>
        <List dense>
          {generateListItem('threeOfKind', ReducerActionTypes.UPDATE_THREE_OF_KIND, calculateThreeOfKind)}
          {generateListItem('fourOfKind', ReducerActionTypes.UPDATE_FOUR_OF_KIND, calculateFourOfKind)}
          {generateListItem('fullHouse', ReducerActionTypes.UPDATE_FULL_HOUSE, calculateFullHouse)}
          {generateListItem('smallStraight', ReducerActionTypes.UPDATE_SMALL_STRAIGHT, calculateSmallStraight)}
          {generateListItem('largeStraight', ReducerActionTypes.UPDATE_LARGE_STRAIGHT, calculateLargeStraight)}
          {generateListItemYahtzee()}
          {generateListItem('chance', ReducerActionTypes.UPDATE_CHANCE, calculateChance)}
        </List>
      </Box>
    </Box>)
}