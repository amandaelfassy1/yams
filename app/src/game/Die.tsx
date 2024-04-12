import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReducerAction, ReducerActionTypes, ReducerState } from "../types/Types";

export default function Die(props: { id: number, state: ReducerState, dispatch: React.Dispatch<ReducerAction> }) {
  const diceIcons = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix];
  const reducerActionTypes = [
    ReducerActionTypes.LOCK_DIE1,
    ReducerActionTypes.LOCK_DIE2,
    ReducerActionTypes.LOCK_DIE3,
    ReducerActionTypes.LOCK_DIE4,
    ReducerActionTypes.LOCK_DIE5];
  const stateDie = [
    props.state.dice.die1,
    props.state.dice.die2,
    props.state.dice.die3,
    props.state.dice.die4,
    props.state.dice.die5,
  ]
  return (
    <FontAwesomeIcon icon={diceIcons[stateDie[props.id].numberRolled - 1]}
      style={{ color: 'white', fontSize: '4em', opacity: stateDie[props.id].isLocked ? '0.7' : '1' }}
      onClick={() => props.dispatch({ type: reducerActionTypes[props.id] })} />
  )
}