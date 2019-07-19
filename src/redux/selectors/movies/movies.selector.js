import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const movies = state => state.movies;
const favorite = state => state.favoriteMovies;

export const getAllMovies = createSelector(
  [movies, favorite],
  (movies, favorite) => !isEmpty(movies) ? movies.map(item => {
    const isFavorite =  favorite.find(f => f.id === item.id) ? true : !!null;

    return {
      id: item.id,
      title: item.title,
      image: item.poster_path,
      favorite: isFavorite,
    };
  }) : [],
);

export const getFavoriteMovies = state => state.favoriteMovies;
