export const actions = {
  TOGGLE_UPDATENAME_MODAL: 'modals/toggle-updatename-modal',
};

export const toggleUpdateNameModal = () => {
  return {
    type: actions.TOGGLE_UPDATENAME_MODAL,
  };
};
