import { createAction } from 'shared';

export const loadMoviesByGenresRequested = createAction('LOAD_MOVIES_BY_GENRES_REQUESTED', 'genres');
export const loadMoviesSuccess = createAction('LOAD_MOVIES_SUCCESS', 'movies',);
export const addFavoriteMovie = createAction('ADD_FAVORITE_MOVIE', 'movie');
