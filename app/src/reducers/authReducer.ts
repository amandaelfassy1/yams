interface AuthState {
    user: any; 
    error: string | null; 
  }
  
  const initialState: AuthState = {
    user: null,
    error: null,
  };
  
  const authReducer = (state = initialState, action: any): AuthState => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, user: action.payload, error: null };
      case 'LOGIN_FAILURE':
        return { ...state, user: null, error: action.payload };
      default:
        return state;
    }
  };
  
  export default authReducer;
  
  