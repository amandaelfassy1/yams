// gameActions.tsx

import axios from 'axios';
import { Dispatch } from 'redux';

// Action types
export const PLAY_GAME_REQUEST = 'PLAY_GAME_REQUEST';
export const PLAY_GAME_SUCCESS = 'PLAY_GAME_SUCCESS';
export const PLAY_GAME_FAILURE = 'PLAY_GAME_FAILURE';

// Action interfaces
interface PlayGameRequestAction {
  type: typeof PLAY_GAME_REQUEST;
}

interface PlayGameSuccessAction {
  type: typeof PLAY_GAME_SUCCESS;
}

interface PlayGameFailureAction {
  type: typeof PLAY_GAME_FAILURE;
  error: string;
}

// Union type for all possible action types
export type GameActionTypes =
  | PlayGameRequestAction
  | PlayGameSuccessAction
  | PlayGameFailureAction;

// Action creators
export const playGameRequest = (): PlayGameRequestAction => ({
  type: PLAY_GAME_REQUEST,
});

export const playGameSuccess = (): PlayGameSuccessAction => ({
  type: PLAY_GAME_SUCCESS,
});

export const playGameFailure = (error: string): PlayGameFailureAction => ({
  type: PLAY_GAME_FAILURE,
  error,
});

// Thunk action creator
export const playGame = (token: string) => async (dispatch: Dispatch<GameActionTypes>) => {
  dispatch(playGameRequest());
  try {
    // Make API call to start a new game
    const response = await axios.post(
      '/api/game/play',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Handle success
    dispatch(playGameSuccess());
    return response.data; // You may return any relevant data here
  } catch (error) {
    // Handle error
    throw error; // Rethrow the error for further handling if needed
  }
};
