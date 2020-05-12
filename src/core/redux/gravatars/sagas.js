import { channel } from 'redux-saga';
import { takeLatest, put, fork, take, select, all } from 'redux-saga/effects';
import {
  actions as commitActions,
  commitSendSuccess,
  commitMinedSuccess,
  commitError,
} from 'core/redux/contracts/actions';
import { actions } from './actions';

const gravatarCreationChannel = channel();
const gravatarUpdateChannel = channel();
const getLoginState = (state) => state.login;
const getContractsState = (state) => state.contracts;

/**
 * @dev Event channel to control the smart contract update events
 */
function* handleGravatarCreation() {
  while (true) {
    const eventAction = yield take(gravatarCreationChannel);
    switch (eventAction.type) {
      case commitActions.COMMIT_SEND_SUCCESS: {
        yield put(commitSendSuccess(eventAction.tx));
        break;
      }

      case commitActions.COMMIT_MINED_SUCCESS: {
        yield put(commitMinedSuccess(eventAction.receipt));

        yield put({
          type: actions.GRAVATAR_CREATED,
          creatingGravatar: false,
          gravatarCreated: true,
        });

        yield put({
          type: actions.STOP_CHANNEL_FORK,
        });

        break;
      }
      case commitActions.COMMIT_ERROR: {
        yield put(commitError(eventAction.error));
        break;
      }

      case actions.STOP_CHANNEL_FORK: {
        return;
      }

      default: {
        break;
      }
    }
  }
}

/**
 * @dev Allows creating a gravatar
 */
function* CREATE_GRAVATAR_SAGA(action) {
  yield put({
    type: actions.GRAVATAR_CREATION_REQUESTED,
    payload: {
      creatingListing: true,
      listingCreated: false,
    },
  });

  yield put({
    type: commitActions.COMMIT_CHANGE_STATE,
    payload: {
      commitSendLoading: true,
      commitMinedLoading: true,
    },
  });

  const { displayName } = action;

  const { Gravatar } = yield select(getContractsState);

  const { selectedAccount } = yield select(getLoginState);

  // fork to handle channel
  yield fork(handleGravatarCreation);

  try {
    Gravatar.instance.methods
      .createGravatar(displayName)
      .send({
        from: selectedAccount,
      })
      .once('transactionHash', (tx) => {
        gravatarCreationChannel.put({
          type: commitActions.COMMIT_SEND_SUCCESS,
          tx,
        });
      })
      .once('receipt', (receipt) => {
        gravatarCreationChannel.put({
          type: commitActions.COMMIT_MINED_SUCCESS,
          receipt,
        });
      })
      .on('error', (error) => {
        gravatarCreationChannel.put({
          type: commitActions.COMMIT_ERROR,
          error,
        });
      });
  } catch (err) {
    const errMsg = err.toString();
    const shortErr = errMsg.substring(0, errMsg.indexOf('.') + 1);
    put(commitError(shortErr));
  }
}

/**
 * @dev Event channel to control the smart contract update events
 */
function* handleGravatarUpdate() {
  while (true) {
    const eventAction = yield take(gravatarUpdateChannel);
    switch (eventAction.type) {
      case commitActions.COMMIT_SEND_SUCCESS: {
        yield put(commitSendSuccess(eventAction.tx));
        break;
      }

      case commitActions.COMMIT_MINED_SUCCESS: {
        yield put(commitMinedSuccess(eventAction.receipt));

        yield put({
          type: actions.GRAVATAR_UPDATED,
          updatingGravatar: false,
          gravatarUpdated: true,
        });

        yield put({
          type: actions.STOP_CHANNEL_FORK,
        });

        break;
      }
      case commitActions.COMMIT_ERROR: {
        yield put(commitError(eventAction.error));
        break;
      }

      case actions.STOP_CHANNEL_FORK: {
        return;
      }

      default: {
        break;
      }
    }
  }
}

/**
 * @dev Allows creating a gravatar
 */
function* UPDATE_GRAVATAR_SAGA(action) {
  yield put({
    type: actions.GRAVATAR_UPDATE_REQUESTED,
    payload: {
      updatingGravatar: true,
      gravatarUpdated: false,
    },
  });

  yield put({
    type: commitActions.COMMIT_CHANGE_STATE,
    payload: {
      commitSendLoading: true,
      commitMinedLoading: true,
    },
  });

  const { displayName } = action;

  const { Gravatar } = yield select(getContractsState);

  const { selectedAccount } = yield select(getLoginState);

  // fork to handle channel
  yield fork(handleGravatarUpdate);

  try {
    Gravatar.instance.methods
      .updateGravatarName(displayName)
      .send({
        from: selectedAccount,
      })
      .once('transactionHash', (tx) => {
        gravatarUpdateChannel.put({
          type: commitActions.COMMIT_SEND_SUCCESS,
          tx,
        });
      })
      .once('receipt', (receipt) => {
        gravatarUpdateChannel.put({
          type: commitActions.COMMIT_MINED_SUCCESS,
          receipt,
        });
      })
      .on('error', (error) => {
        gravatarUpdateChannel.put({
          type: commitActions.COMMIT_ERROR,
          error,
        });
      });
  } catch (err) {
    const errMsg = err.toString();
    const shortErr = errMsg.substring(0, errMsg.indexOf('.') + 1);
    put(commitError(shortErr));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actions.CREATE_GRAVATAR, CREATE_GRAVATAR_SAGA),
    (actions.UPDATE_GRAVATAR, UPDATE_GRAVATAR_SAGA),
  ]);
}
