import axios from 'axios';
import { apiCall } from 'shared';
import { API_KEY, API_PREFIX } from 'consts';

const getPopularMovies = () => {
  return apiCall(axios.get(`${API_PREFIX}/movie/popular`, {
    params: {
      api_key: API_KEY,
      page: 1,
    },
  }));
};

const getGenresList = () => {
  return apiCall(axios.get(`${API_PREFIX}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
    },
  }));
};

const getMoviesByGenres = (genres) => {
  return apiCall(axios.get(`${API_PREFIX}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genres,
    },
  }));
};

export const Api = {
  getPopularMovies,
  getGenresList,
  getMoviesByGenres,
};
