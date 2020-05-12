export const actions = {
  CREATE_GRAVATAR: 'gravatar/##--Creating--##',
  GRAVATAR_CREATION_REQUESTED: 'gravatar/creation-requested',
  GRAVATAR_CREATED: 'gravatar/created',
  UPDATE_GRAVATAR: 'gravatar/##--Updating--##',
  GRAVATAR_UPDATE_REQUESTED: 'gravatar/update-requested',
  GRAVATAR_UPDATED: 'gravatar/updated',
  STOP_CHANNEL_FORK: 'gravatar/STOP_CHANNEL_FORK',
};

export const createGravatar = (displayName) => {
  return {
    type: actions.CREATE_GRAVATAR,
    displayName,
  };
};

export const updateGravatar = (displayName) => {
  return {
    type: actions.UPDATE_GRAVATAR,
    displayName,
  };
};
