import { createReducer } from 'shared';
import { fetchGenresSuccess } from 'redux/actions';

export const genresReducer = createReducer([], {
  [fetchGenresSuccess]: (state, { genres }) => ([...genres]),
});
