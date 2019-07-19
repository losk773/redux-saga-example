import {
  call,
  put,
  fork,
  all,
  take,
  takeLatest,
  race,
  delay,
  takeEvery,
  select,
  cancel,
} from 'redux-saga/effects';
import {
  loadHomeDataRequested,
  loadMoviesByGenresRequested,
  loadMoviesSuccess,
  loadGenresSuccess,
  addFavoriteMovie,
  openMessage,
  closeMessage,
} from 'redux/actions';

import { getFavoriteMovies } from 'redux/selectors';
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
      loadMoviesSuccess(movies),
      loadGenresSuccess(genres)
    ]);

  } catch (error) {
    console.log(error);
  }
}

function * fetchMoviesByGenres ({genres}) {
  try {
    const { data: { results } } = yield call(Api.getMoviesByGenres, genres);
    yield put(loadMoviesSuccess(results));
  } catch (error) {
    console.log(error);
  }
}

function * closeModal () {
  const { timeout } = yield race({
    click: take(closeMessage),
    timeout: delay(3000),
  });

  if (timeout) {
    yield put(closeMessage());
  }

}

function * watchAddFavoriteMovie () {
  const favorite = yield select(getFavoriteMovies);

  for (let i = 1; i <= 3; i++) {
    if (favorite.length >= 3) yield cancel();
    yield take(addFavoriteMovie);
  }

  yield put(openMessage('Congratulations! You added first 3 films'));

}

function * watchLoadHomeData () {
  while (true) {
    yield take(loadHomeDataRequested);
    yield call(loadHomeData);
  }
}

function * watchOpenMessage () {
  yield takeEvery(openMessage, closeModal);
}

function * watchLoadMoviesByGenres () {
  yield takeLatest(loadMoviesByGenresRequested, fetchMoviesByGenres);
}

export function * rootSaga () {

  yield all([
    fork(watchLoadHomeData),
    fork(watchLoadMoviesByGenres),
    fork(watchAddFavoriteMovie),
    fork(watchOpenMessage)
  ]);
}
