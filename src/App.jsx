import React from 'react';
import { hot } from 'react-hot-loader/root';
// Redux and Redux-saga
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'core/redux/sagas';
import rootReducer, { history } from 'core/redux/reducers';
import logger from 'redux-logger';
// Router
import { routerMiddleware } from 'connected-react-router';
import Router from './router.jsx';

import './assets/styles/App.css';

const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
const middlewares = [sagaMiddleware, routeMiddleware];

if (process.env.NODE_ENV === 'development' && true) {
  middlewares.push(logger);
}

const store = createStore(rootReducer, compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

function App() {
  return (
    <Provider store={store}>
      <Router history={history} />
    </Provider>
  );
}

export default hot(App);
