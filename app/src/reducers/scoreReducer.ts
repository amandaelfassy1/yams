interface ScoreState {
    score: number;
    error: string | null;
  }
  
  const initialState: ScoreState = {
    score: 0,
    error: null,
  };
  
  const scoreReducer = (state = initialState, action: any): ScoreState => {
    switch (action.type) {
      case 'FETCH_SCORE_SUCCESS':
        return { ...state, score: action.payload, error: null };
      case 'FETCH_SCORE_FAILURE':
        return { ...state, error: action.payload };
      case 'UPDATE_SCORE_SUCCESS':
        return { ...state, score: action.payload, error: null };
      case 'UPDATE_SCORE_FAILURE':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default scoreReducer;