
import { Dispatch } from 'redux';
import ScoreService from '../services/score.service';

export const fetchScore = () => async (dispatch: Dispatch) => {
  try {
    const score = await ScoreService.getScore();
    dispatch({ type: 'FETCH_SCORE_SUCCESS', payload: score });
  } catch (error) {
    dispatch({ type: 'FETCH_SCORE_FAILURE', payload: error });
  }
};
export const updateScore = (score: number) => async (dispatch: Dispatch) => {
    try {
      await ScoreService.updateScore(score);
      dispatch({ type: 'UPDATE_SCORE_SUCCESS', payload: score });
    } catch (error) {
      dispatch({ type: 'UPDATE_SCORE_FAILURE', payload: error });
    }
  };