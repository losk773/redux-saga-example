import { HomeScene } from 'scenes';
import { connect } from 'react-redux';
import { fetchMoviesRequested, fetchGenresRequested, fetchMoviesByGenresRequested } from 'redux/actions';

const mapStateToProps = (state) => {
  const { movies: { moviesList }, genres: { genresList } } = state;

  return {
    moviesList,
    genresList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(fetchMoviesRequested(true)),
    getGenres: () => dispatch(fetchGenresRequested(true)),
    getMoviesByGenres: (genres) => dispatch(fetchMoviesByGenresRequested(genres)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
