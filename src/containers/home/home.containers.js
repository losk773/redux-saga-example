import { HomeScene } from 'scenes';
import { connect } from 'react-redux';
import { loadHomeDataRequested, fetchMoviesByGenresRequested } from 'redux/actions';

const mapStateToProps = (state) => {
  const { movies, genres } = state;

  return {
    movies,
    genres,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadHomeData: () => dispatch(loadHomeDataRequested()),
    getMoviesByGenres: (genres) => dispatch(fetchMoviesByGenresRequested(genres)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScene);
