export const INITIALIZE_CONTRACTS = 'contracts/initialize-contracts'
export const CONTRACTS_SYNC_START = 'contracts/sync-start'
export const CONTRACT_INITIALIZED = 'contracts/contracts-initialized'
export const CONTRACTS_SYNCED = 'contracts/synced'

export const initializeContracts = (contracts, web3) => {
  return {
    type: INITIALIZE_CONTRACTS,
    contracts,
    web3,
  }
}
