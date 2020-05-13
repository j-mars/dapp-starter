export const actions = {
  TOGGLE_UPDATENAME_MODAL: 'modals/toggle-updatename-modal',
  TOGGLE_CREATE_MODAL: 'modals/toggle-create-modal',
};

export const toggleUpdateNameModal = () => {
  return {
    type: actions.TOGGLE_UPDATENAME_MODAL,
  };
};

export const toggleCreateModal = () => {
  return {
    type: actions.TOGGLE_CREATE_MODAL,
  };
};
