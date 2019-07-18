import { createAction } from 'shared';

export const fetchMoviesRequested = createAction('FETCH_MOVIES_REQUESTED', 'loading');
export const fetchMoviesByGenresRequested = createAction('FETCH_MOVIES_BY_GENRES_REQUESTED', 'genres');
export const fetchMoviesSuccess = createAction('FETCH_MOVIES_SUCCESS', 'movies',);
