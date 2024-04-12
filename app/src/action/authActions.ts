import { Dispatch } from 'redux';
import AuthService from '../services/auth.service';

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  try {
    const user = await AuthService.signin(email, password);
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error });
  }
}