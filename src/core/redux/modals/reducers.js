import { actions } from './actions';

const initialState = {
  updateNameModal: false,
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

    default:
      reduced = state;
  }
  return reduced;
}
