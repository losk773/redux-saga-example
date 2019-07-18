import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

const moviesList = state => state.movies.moviesList;

export const getAllMovies = createSelector(
  [moviesList],
  movies => !isEmpty(movies) ? movies.map(item => {
    return {
      id: item.id,
      title: item.title,
      image: item.poster_path,
    };
  }) : [],
);
