import { HomeScene } from 'scenes';
import { connect } from 'react-redux';
import {
  loadHomeDataRequested,
  loadMoviesByGenresRequested,
  addFavoriteMovie,
  closeMessage,
} from 'redux/actions';
import { getAllMovies } from 'redux/selectors';

const mapStateToProps = (state) => {
  const { genres, favoriteMovies, message } = state;

  return {
    movies: getAllMovies(state),
    genres,
    favoriteMovies,
    message,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadHomeData: () => dispatch(loadHomeDataRequested()),
    getMoviesByGenres: (genres) => dispatch(loadMoviesByGenresRequested(genres)),
    addFavoriteMovie: (movie) => dispatch(addFavoriteMovie(movie)),
    closeMessage: () => dispatch(closeMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
