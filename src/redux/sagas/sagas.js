import { call, put, fork, all, take, takeLatest } from 'redux-saga/effects';
import {
  loadHomeDataRequested,
  fetchMoviesSuccess,
  fetchGenresSuccess,
  fetchMoviesByGenresRequested,
} from 'redux/actions';
import { Api } from 'api';

function * loadHomeData () {
  try {
    const [moviesRes, genresRes] = yield all([
      call(Api.getPopularMovies),
      call(Api.getGenresList)
    ]);
    const { data: { results: movies } } = moviesRes;
    const { data: { genres } } = genresRes;

    yield put([
      fetchMoviesSuccess(movies),
      fetchGenresSuccess(genres)
    ]);

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

function * watchLoadHomeData () {
  while (true) {
    yield take(loadHomeDataRequested);
    yield call(loadHomeData);
  }
}

function * watchFetchMoviesByGenres () {
  yield takeLatest(fetchMoviesByGenresRequested, fetchMoviesByGenres);
}

export function * rootSaga () {

  yield all([
    fork(watchLoadHomeData),
    fork(watchFetchMoviesByGenres),
  ]);
}
