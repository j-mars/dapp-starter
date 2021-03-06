import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createHashHistory } from 'history';
import contracts from 'core/redux/contracts/reducers';
import gravatars from 'core/redux/gravatars/reducers';
import login from 'core/redux/login/reducers';
import menu from 'core/redux/menu/reducers';
import modals from 'core/redux/modals/reducers';
import settings from 'core/redux/settings/reducers';
import { actions } from 'core/redux/login/actions';

export const history = createHashHistory();

const appReducer = combineReducers({
  contracts,
  gravatars,
  login,
  menu,
  modals,
  router: connectRouter(history),
  settings,
});

export default (state, action) => {
  if (action.type === actions.LOGIN_SIGNOUT) {
    // preserve menu and settings
    const { menu: men, settings: sets } = state;
    // eslint-disable-next-line
    state = { menu: men, settings: sets };
  }
  return appReducer(state, action);
};
