import { createReducer } from 'shared';
import { loadGenresSuccess } from 'redux/actions';

export const genresReducer = createReducer([], {
  [loadGenresSuccess]: (state, { genres }) => ([...genres]),
});
