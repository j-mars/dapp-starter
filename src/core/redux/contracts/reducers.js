// Smart-Contracts
import Gravity from 'abi/Gravity.json'
import generateContractsInitialState from 'core/services/contracts'
import { CONTRACTS_SYNC_START, CONTRACT_INITIALIZED, CONTRACTS_SYNCED } from './actions'

// Contracts here
export const Contracts = [Gravity]

const initialState = {
  ...generateContractsInitialState(Contracts),
  contractsInitialized: false,
  contractsInitializing: false,
}

export default function contractsReducer(state = initialState, action) {
  let reduced
  switch (action.type) {
    case CONTRACTS_SYNC_START:
      reduced = {
        ...state,
        ...action.payload,
      }
      break

    case CONTRACT_INITIALIZED:
      reduced = {
        ...state,
        [action.name]: {
          ...state[action.name],
          initializing: action.initializing,
          synced: action.synced,
          instance: action.instance,
        },
      }
      break

    case CONTRACTS_SYNCED:
      reduced = {
        ...state,
        ...action.payload,
      }
      break

    default:
      reduced = state
  }
  return reduced
}
