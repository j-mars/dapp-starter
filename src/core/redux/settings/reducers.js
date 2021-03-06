import store from 'store';
import actions from './actions';

const STORED_SETTINGS = (storedSettings) => {
  const settings = {};
  Object.keys(storedSettings).forEach((key) => {
    const item = store.get(`app.settings.${key}`);
    settings[key] = typeof item !== 'undefined' ? item : storedSettings[key];
  });
  return settings;
};

const initialState = {
  ...STORED_SETTINGS({
    isMobileView: false,
    isMobileMenuOpen: false,
    isLightTheme: false,
    isSettingsOpen: false,
    isMenuTop: true,
    isMenuCollapsed: false,
    isBorderless: true,
    isSquaredBorders: false,
    isFixedWidth: false,
    isMenuShadow: true,
    locale: 'en-US',
    baseCrypto: 'eth',
    baseCyptoSymbol: 'Ξ',
    fiatCurrency: 'eur',
    fiatSymbol: '€',
    convertCryptoToFiat: true,
    rate: 0,
  }),
};

export default function userReducer(state = initialState, action) {
  let reduced;
  switch (action.type) {
    case actions.SET_STATE:
      reduced = {
        ...state,
        ...action.payload,
      };
      break;

    case actions.ETH_RATE_UPDATE:
      reduced = {
        ...state,
        ...action.payload,
      };
      break;

    case actions.SET_FIAT_CURRENCY:
      reduced = {
        ...state,
        ...action.payload,
      };
      break;

    case actions.SWITCH_CONVERSION:
      reduced = {
        ...state,
        ...action.payload,
      };
      break;

    default:
      reduced = state;
  }
  return reduced;
}
