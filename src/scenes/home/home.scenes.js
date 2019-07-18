import React, { PureComponent } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class HomeScene extends PureComponent {
  state = {
    title: 'Popular Films',
  }

  componentDidMount () {
    const { getMovies, getGenres } = this.props;
    getGenres();
    getMovies();
  }

  handleSwitchGenres = (genresId, genresName) => {
    const { getMoviesByGenres } = this.props;

    this.setState({title: genresName}, () => {
      getMoviesByGenres(genresId);
    });
  };

  render () {
    const { moviesList, genresList } = this.props;
    const { title } = this.state;

    console.log('render');

    return (
      <div>
        <h1>{title}</h1>
        <div className="genres-list">
          {
            !isEmpty(genresList) ? (
              genresList.map(item => (
                <Link key={item.id} to={item.name.toLowerCase()} onClick={() => this.handleSwitchGenres(item.id, item.name)}>{item.name}</Link>
              ))
            ) : null
          }
        </div>
        <hr/>
        <div className="movies-grid">
          {
            isEmpty(moviesList) || (
              moviesList.map(item => (
                <div key={item.id} className="movies-grid__item">
                  <div className="movie">
                    <div className="movie__thumb">
                      <img src={`https://image.tmdb.org/t/p/w342${item.poster_path}`} alt=""/>
                    </div>
                  </div>
                </div>
              ))
            )
          }
        </div>
      </div>
    );
  }
}

HomeScene.propTypes = {
  getGenres: PropTypes.func,
  getMovies: PropTypes.func,
  getMoviesByGenres: PropTypes.func,
  moviesList: PropTypes.array,
  genresList: PropTypes.array,
  loading: PropTypes.bool,
};
