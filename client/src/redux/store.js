import { createStore, applyMiddleware } from 'redux';

import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

import logger from 'redux-logger';
import rootReducer from './root-reducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV==='development') {
    middlewares.push(logger);
}
    
export const store = createStore(rootReducer, applyMiddleware(...middlewares)); //object in middleware as separate arguments

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store)

export default { store, persistor };
