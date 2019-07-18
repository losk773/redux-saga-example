import { createStore, applyMiddleware, compose } from 'redux';
import reducer from 'redux/reducers';
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

export const store = createStore(
  enableBatch(resetStateReducer(reducer)),
  composeEnhancers(
    applyMiddleware(...middlewares)
  )
);

sagaMiddleware.run(rootSaga);
