import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import contracts from 'core/redux/contracts/reducers';
import login from 'core/redux/login/reducers';
import menu from 'core/redux/menu/reducers';
import settings from 'core/redux/settings/reducers';
import { actions } from 'core/redux/login/actions';

export const history = createHashHistory();

const appReducer = combineReducers({
  contracts,
  router: connectRouter(history),
  login,
  menu,
  settings,
});

export default (state, action) => {
  if (action.type === actions.LOGIN_SIGNOUT) {
    // eslint-disable-next-line
    state = undefined;
  }
  return appReducer(state, action);
};
