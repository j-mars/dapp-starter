import { takeLatest, put, select, all } from 'redux-saga/effects';
import { actions } from './actions';

const getLoginState = (state) => state.login;
const networkId = process.env.REACT_APP_NETWORK_ID;

function* initializeContractsSaga(action) {
  const { contracts, web3 } = action;
  const { selectedAccount } = yield select(getLoginState);

  yield put({
    type: actions.CONTRACTS_SYNC_START,
    payload: {
      contractsInitialized: false,
      contractsInitializing: true,
    },
  });
  yield all(
    contracts.map((contract) => {
      const { abi, networks, deployedBytecode } = contract;

      const web3Contract = new web3.eth.Contract(abi, networks[networkId].address, {
        from: selectedAccount,
        data: deployedBytecode,
      });

      return put({
        type: actions.CONTRACT_INITIALIZED,
        name: contract.contractName,
        synced: true,
        instance: web3Contract,
      });
    }),
  );
  yield put({
    type: actions.CONTRACTS_SYNCED,
    payload: {
      contractsInitialized: true,
      contractsInitializing: false,
    },
  });
}

export default function* rootSaga() {
  yield takeLatest(actions.INITIALIZE_CONTRACTS, initializeContractsSaga);
}
