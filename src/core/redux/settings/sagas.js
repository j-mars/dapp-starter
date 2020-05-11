import { all, takeEvery, put, delay, call, select, race, take } from 'redux-saga/effects';
import store from 'store';
import qs from 'qs';
import { history, store as reduxStore } from 'App2';
import fetchRate from 'core/services/price';
import actions from './actions';

const getSettingsState = (state) => state.settings;

export function* CHANGE_SETTING({ payload: { setting, value } }) {
  yield store.set(`app.settings.${setting}`, value);
  yield put({
    type: 'settings/SET_STATE',
    payload: {
      [setting]: value,
    },
  });
}

export function* CHANGE_FIAT_CURRENCY(action) {
  const { payload } = action;

  const { value } = payload;

  let symbol;

  switch (value) {
    case 'eur':
      symbol = '€';
      break;

    case 'gbp':
      symbol = '£';
      break;

    case 'usd':
      symbol = '$';
      break;

    default: {
      break;
    }
  }

  if (value !== 'eth') {
    yield put({
      type: actions.SET_FIAT_CURRENCY,
      payload: {
        convertCryptoToFiat: true,
        fiatCurrency: value,
        fiatSymbol: symbol,
      },
    });
    yield put({ type: actions.CANCEL_UPDATE_RATE });
    yield put({ type: actions.RESTART_RATE_UPDATE });
  } else {
    yield put({
      type: actions.SWITCH_CONVERSION,
      payload: {
        convertCryptoToFiat: false,
      },
    });
  }
}

export function* UPDATE_ETH_RATE() {
  while (true) {
    const { fiatCurrency } = yield select(getSettingsState);

    const { ethereum } = yield call(fetchRate, fiatCurrency);

    let rate;

    switch (fiatCurrency) {
      case 'eur':
        rate = ethereum.eur;
        break;

      case 'usd':
        rate = ethereum.usd;
        break;

      case 'gbp':
        rate = ethereum.gbp;
        break;

      default: {
        break;
      }
    }

    if (rate) {
      yield put({
        type: actions.ETH_RATE_UPDATE,
        payload: {
          rate: Number(rate),
        },
      });
    }

    yield delay(30000);
  }
}

function* RATE_CONTROLLER() {
  yield race({
    task: UPDATE_ETH_RATE(),
    cancel: take(actions.CANCEL_UPDATE_RATE),
  });
}

export function* SETUP() {
  yield call(RATE_CONTROLLER);

  // load settings from url on app load
  const changeSettings = (search) => {
    const query = qs.parse(search, { ignoreQueryPrefix: true });
    Object.keys(query).forEach((key) => {
      reduxStore.dispatch({
        type: 'settings/CHANGE_SETTING',
        payload: {
          setting: key,
          value: query[key] === 'true',
        },
      });
    });
  };
  yield changeSettings(history.location.search);
  yield history.listen((params) => {
    const { search } = params;
    changeSettings(search);
  });

  // detect isMobileView setting on app load and window resize
  const isMobileView = (load = false) => {
    const currentState = global.window.innerWidth < 768;
    const prevState = store.get('app.settings.isMobileView');
    if (currentState !== prevState || load) {
      reduxStore.dispatch({
        type: 'settings/CHANGE_SETTING',
        payload: {
          setting: 'isMobileView',
          value: currentState,
        },
      });
    }
  };
  yield isMobileView(true);
  yield window.addEventListener('resize', () => {
    isMobileView();
  });
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.CHANGE_SETTING, CHANGE_SETTING),
    SETUP(), // run once on app load to init listeners
    takeEvery(actions.RESTART_RATE_UPDATE, RATE_CONTROLLER),
    takeEvery(actions.CHANGE_FIAT_CURRENCY, CHANGE_FIAT_CURRENCY),
  ]);
}
