import { actions } from './actions';

const initialState = {
  creatingGravatar: false,
  gravatarCreated: false,
  updatingGravatar: false,
  gravatarUpdated: false,
};

export default function gravatarReducer(state = initialState, action) {
  let reduced;
  switch (action.type) {
    case actions.GRAVATAR_CREATION_REQUESTED:
      reduced = {
        ...state,
        ...action.payload,
      };
      break;

    case actions.GRAVATAR_CREATED:
      reduced = {
        ...state,
        ...action.payload,
      };
      break;

    case actions.GRAVATAR_UPDATE_REQUESTED:
      reduced = {
        ...state,
        ...action.payload,
      };
      break;

    case actions.GRAVATAR_UPDATED:
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
