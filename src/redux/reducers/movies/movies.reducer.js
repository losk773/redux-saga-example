import { createReducer } from 'shared';
import uniqBy from 'lodash/uniqBy';
import { loadMoviesSuccess, addFavoriteMovie } from 'redux/actions';

export const moviesReducer = createReducer([], {
  [loadMoviesSuccess]: (state, { movies }) => ([...movies]),
});

export const favoriteMoviesReducer = createReducer([], {
  [addFavoriteMovie]: (state, { movie }) => uniqBy([...state, movie], 'id'),
});
