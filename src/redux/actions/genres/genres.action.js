import { createAction } from 'shared';

export const fetchGenresRequested = createAction('FETCH_GENRES_REQUESTED', 'loading');
export const fetchGenresSuccess = createAction('FETCH_GENRES_SUCCESS', 'genres');
