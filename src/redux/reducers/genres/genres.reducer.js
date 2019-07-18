import { createReducer } from 'shared';
import { fetchGenresSuccess, fetchGenresRequested } from 'redux/actions';

const initialState = {
  genresList: [],
  loading: false,
};

export const genresReducer = createReducer(initialState, {
  [fetchGenresRequested]: (state, { loading }) => ({...state, loading}),
  [fetchGenresSuccess]: (state, { genres: genresList }) => ({...state, genresList, loading: false}),
});
