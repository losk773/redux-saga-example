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

  selectGenres = (e, genresId, genresName) => {
    e.preventDefault();
    const { getMoviesByGenres } = this.props;

    this.setState({title: genresName}, () => {
      getMoviesByGenres(genresId);
    });
  };

  addFavoriteMovie = (e, item) => {
    const { addFavoriteMovie } = this.props;
    const { currentTarget } = e;

    currentTarget.disabled = true;
    currentTarget.innerHTML = 'Added';
    item.favorite = true;
    addFavoriteMovie(item);
  };

  render () {
    const { movies, genres, favoriteMovies, message, closeMessage } = this.props;
    const { title } = this.state;
    return (
      <div className="wrapper">
        {
          !message.isOpen || (
            <div className="message" onClick={closeMessage}>
              <div className="text">
                {message.text}
              </div>
            </div>
          )
        }
        <div className="genres-list">
          {
            !isEmpty(genres) ? (
              genres.map(item => (
                <Link key={item.id} to={item.name.toLowerCase()} onClick={(e) => this.selectGenres(e, item.id, item.name)}>{item.name}</Link>
              ))
            ) : null
          }
        </div>
        <hr/>
        <div className="grid">
          <div className="grid__item">
            <h1>{title}</h1>
            <div className="movies-grid">
              {
                isEmpty(movies) || (
                  movies.map(item => (
                    <div key={item.id} className="movies-grid__item">
                      <div className="movie" >
                        <div className="movie__thumb">
                          <img src={`https://image.tmdb.org/t/p/w342${item.image}`} alt={item.title}/>
                        </div>
                        <button type={'button'} disabled={item.favorite ? true : !!null} onClick={(e) => this.addFavoriteMovie(e, item)}>
                          {
                            !item.favorite ? 'Add to favorite' : 'Added'
                          }
                        </button>
                      </div>
                    </div>
                  ))
                )
              }
            </div>
          </div>
          <div className="grid__item">
            <h1>Favorite Movies</h1>
            <div className="movies-grid">
              {
                isEmpty(favoriteMovies) || (
                  favoriteMovies.map(item => (
                    <div key={item.id} className="movies-grid__item">
                      <div className="movie">
                        <div className="movie__thumb">
                          <img src={`https://image.tmdb.org/t/p/w342${item.image}`} alt=""/>
                        </div>
                      </div>
                    </div>
                  ))
                )
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomeScene.propTypes = {
  loadHomeData: PropTypes.func,
  addFavoriteMovie: PropTypes.func,
  getMoviesByGenres: PropTypes.func,
  movies: PropTypes.array,
  genres: PropTypes.array,
  favoriteMovies: PropTypes.array,
  message: PropTypes.shape({
    isOpen: PropTypes.bool,
    text: PropTypes.string,
  }),
  closeMessage: PropTypes.func,
};
