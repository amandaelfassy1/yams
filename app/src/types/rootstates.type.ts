
import { AuthState } from '../reducers/authReducer';
import { ScoreState } from '../reducers/scoreReducer';

export interface RootState {
  auth: AuthState;
  score: ScoreState;
}
