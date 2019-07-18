import { call, put, takeEvery, fork, all } from 'redux-saga/effects';
import {
  fetchMoviesSuccess,
  fetchMoviesRequested,
  fetchGenresSuccess,
  fetchGenresRequested,
  fetchMoviesByGenresRequested,
} from 'redux/actions';
import { Api } from 'api';

function * fetchPopularMovies () {
  try {
    const { data: { results } } = yield call(Api.getPopularMovies);
    yield put(fetchMoviesSuccess(results));
  } catch (error) {
    console.log(error);
  }
}

function * fetchAllGenres () {
  try {
    const { data: { genres } } = yield call(Api.getGenresList);
    yield put(fetchGenresSuccess(genres));
  } catch (error) {
    console.log(error);
  }
}

function * fetchMoviesByGenres ({genres}) {
  try {
    const { data: { results } } = yield call(Api.getMoviesByGenres, genres);
    yield put(fetchMoviesSuccess(results));
  } catch (error) {
    console.log(error);
  }
}

function * watchFetchMovies () {
  yield takeEvery(fetchMoviesRequested, fetchPopularMovies);
}

function * watchFetchGenres () {
  yield takeEvery(fetchGenresRequested, fetchAllGenres);
}

function * watchFetchMoviesByGenres () {
  yield takeEvery(fetchMoviesByGenresRequested, fetchMoviesByGenres);
}

export function * rootSaga () {

  yield all([
    fork(watchFetchMovies),
    fork(watchFetchGenres),
    fork(watchFetchMoviesByGenres),
  ]);
}
