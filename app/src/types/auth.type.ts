// auth.types.ts

export const SET_TOKEN = 'SET_TOKEN';

export interface AuthState {
  token: string | null;
}

export interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: string | null;
}

export type AuthActionTypes = SetTokenAction;
