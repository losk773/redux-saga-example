import { combineReducers } from 'redux';
import { moviesReducer, favoriteMoviesReducer } from './movies/movies.reducer';
import { genresReducer } from './genres/genres.reducer';
import { messageReducer } from './messages/messages.reducer';

export default combineReducers({
  movies: moviesReducer,
  genres: genresReducer,
  favoriteMovies: favoriteMoviesReducer,
  message: messageReducer,
});
