import { createStore, applyMiddleware, compose } from 'redux';
import reducer from 'redux/reducers';
import persistState from 'redux-localstorage';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas/sagas';
import {
  resetStateReducer,
  batch,
  enableBatch,
} from 'shared';

const isDevelopment = process.env.NODE_ENV === 'development';
const composeEnhancers = isDevelopment ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose : compose;

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  batch,
  sagaMiddleware,
];

const persistKeys = {
  favoriteMovies: '', // also edited in booking forms
};

export const store = createStore(
  enableBatch(resetStateReducer(reducer)),
  composeEnhancers(
    applyMiddleware(...middlewares),
    persistState(Object.keys(persistKeys), {
      key: 'state',
      slicer: (paths) => (state) =>
        paths.reduce((serialized, path) => ({
          ...serialized,
          [path]: state[path],
        }), {}),
    })
  )
);

sagaMiddleware.run(rootSaga);
