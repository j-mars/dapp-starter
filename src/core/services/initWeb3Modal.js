import Web3Modal from 'web3modal'
import Torus from '@toruslabs/torus-embed'
import Fortmatic from 'fortmatic'
import Squarelink from 'squarelink'
import Portis from '@portis/web3'
import WalletConnectProvider from '@walletconnect/web3-provider'

const HTTP_ENDPOINT = 'https://127.0.0.1:8545'

const getWeb3Modal = () => {
  return new Web3Modal({
    cacheProvider: true,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: 'xx',
          network: 'testnet',
        },
      },
      torus: {
        package: Torus, // required
        options: {
          network: HTTP_ENDPOINT,
        },
      },
      squarelink: {
        package: Squarelink, // required
        options: {
          id: 'fb7ce9a36cea240482fa',
          network: {
            url: HTTP_ENDPOINT,
            chainId: 333,
          },
        },
      },
      fortmatic: {
        package: Fortmatic, // required
        options: {
          key: 'pk_test_2C256CC84C3A479A',
          network: {
            rpcUrl: HTTP_ENDPOINT,
            chainId: 333,
          },
        },
      },
      portis: {
        package: Portis, // required
        options: {
          id: '07af700e-01da-4762-ad4e-6e4723662e60',
          network: {
            nodeUrl: HTTP_ENDPOINT,
            chainId: 333,
          },
        },
      },
    },
  })
}

export default getWeb3Modal
