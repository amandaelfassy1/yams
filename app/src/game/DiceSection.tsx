import { Box, Button } from "@mui/material";
import { ReducerAction, ReducerActionTypes, ReducerState } from "../types/Types";
import Die from "./Die";

export default function DiceSection(props: { state: ReducerState, dispatch: React.Dispatch<ReducerAction> }) {

  return (
    <Box sx={{
      width: '100%',
      flexBasis: '240px',
      overflow: 'hidden',
      background: 'linear-gradient(-45deg,#673ab7,#9c27b0)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center'
    }}>
      <Box sx={{
        fontSize: 'h4.fontSize',
        fontWeight: '200',
        color: 'white'
      }}>
        Yahtzee!
      </Box>
      <Box sx={{
        width: '50%',
        minWidth: '300px',
        flexBasis: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      }}>
        <Die id={0} state={props.state} dispatch={props.dispatch} />
        <Die id={1} state={props.state} dispatch={props.dispatch} />
        <Die id={2} state={props.state} dispatch={props.dispatch} />
        <Die id={3} state={props.state} dispatch={props.dispatch} />
        <Die id={4} state={props.state} dispatch={props.dispatch} />
      </Box>
      <Box>
        <Button variant="contained" disabled={props.state.dice.numberRerolls === 0 || props.state.roundNumber === 14}
          sx={{
            minWidth: '200px',
            background: 'linear-gradient(90deg,#91eae4,#7f7fd5,#91eae4)',
            backgroundSize: '200% auto',
            transition: '0.4s',
            '&:hover': {
              backgroundPosition: 'right center',
            }
          }}
          onClick={() => props.dispatch({ type: ReducerActionTypes.UPDATE_DICE })}>
          {
            props.state.roundNumber === 14 ?
              ('You completed the Game') :
              props.state.dice.numberRerolls === 3 ?
                ('Start Round ' + props.state.roundNumber + '/13') :
                (props.state.dice.numberRerolls + ((props.state.dice.numberRerolls > 1) ? ' Rolls Left' : ' Roll Left'))}
        </Button>
      </Box>
    </Box>
  )
}