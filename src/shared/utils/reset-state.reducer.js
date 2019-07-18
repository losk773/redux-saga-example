
export const resetStateReducer = (reducer) => (state, action) =>
  action.type === 'RESET_STATE'
    ? state
    : reducer(state, action);
