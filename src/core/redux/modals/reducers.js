import { actions } from './actions';

const initialState = {
  updateNameModal: false,
  createModal: false,
};

export default function modalsReducer(state = initialState, action) {
  let reduced;
  switch (action.type) {
    case actions.TOGGLE_UPDATENAME_MODAL:
      reduced = {
        ...state,
        updateNameModal: !state.updateNameModal,
      };
      break;

    case actions.TOGGLE_CREATE_MODAL:
      reduced = {
        ...state,
        createModal: !state.createModal,
      };
      break;

    default:
      reduced = state;
  }
  return reduced;
}
