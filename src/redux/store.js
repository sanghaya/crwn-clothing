import { createStore, applyMiddleware } from 'redux';

import { persistStore } from 'redux-persist';

import logger from 'redux-logger';
import rootReducer from './root-reducer';


const middlewares = [logger];

export const store = createStore(rootReducer, applyMiddleware(...middlewares)); //object in middleware as separate arguments
export const persistor = persistStore(store)

export default { store, persistor };
