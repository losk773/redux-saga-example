import { createReducer } from 'shared';
import { fetchMoviesSuccess, fetchMoviesRequested } from 'redux/actions';

const initialState = {
  moviesList: [],
  loading: false,
};

export const moviesReducer = createReducer(initialState, {
  [fetchMoviesRequested]: (state, { loading }) => ({...state, loading}),
  [fetchMoviesSuccess]: (state, { movies: moviesList }) => ({moviesList, loading: false}),
});
