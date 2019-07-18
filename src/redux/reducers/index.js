import { combineReducers } from 'redux';
import { moviesReducer } from './movies/movies.reducer';
import { genresReducer } from './genres/genres.reducer';

export default combineReducers({
  movies: moviesReducer,
  genres: genresReducer,
});
