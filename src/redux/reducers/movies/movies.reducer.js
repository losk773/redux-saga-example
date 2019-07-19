import { createReducer } from 'shared';
import { fetchMoviesSuccess } from 'redux/actions';

export const moviesReducer = createReducer([], {
  [fetchMoviesSuccess]: (state, { movies }) => ([...movies]),
});
