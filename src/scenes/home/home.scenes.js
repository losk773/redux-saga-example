import React, { PureComponent } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class HomeScene extends PureComponent {
  state = {
    title: 'Popular Films',
  }

  componentDidMount () {
    const { loadHomeData } = this.props;
    loadHomeData();
  }

  handleSwitchGenres = (genresId, genresName) => {
    const { getMoviesByGenres } = this.props;

    this.setState({title: genresName}, () => {
      getMoviesByGenres(genresId);
    });
  };

  render () {
    const { movies, genres } = this.props;
    const { title } = this.state;

    console.log('render');

    return (
      <div>
        <h1>{title}</h1>
        <div className="genres-list">
          {
            !isEmpty(genres) ? (
              genres.map(item => (
                <Link key={item.id} to={item.name.toLowerCase()} onClick={() => this.handleSwitchGenres(item.id, item.name)}>{item.name}</Link>
              ))
            ) : null
          }
        </div>
        <hr/>
        <div className="movies-grid">
          {
            isEmpty(movies) || (
              movies.map(item => (
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
  loadHomeData: PropTypes.func,
  getMoviesByGenres: PropTypes.func,
  movies: PropTypes.array,
  genres: PropTypes.array,
};
