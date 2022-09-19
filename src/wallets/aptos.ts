import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  if (!window.aptos) return Promise.reject('Petra wallet not installed')

  const aptosRes = await window.aptos.connect()
  if (!aptosRes) return
  const wallet: WalletInterface<'aptos'> = {
    type: 'aptos',
    account: async () => {
      if (!window.aptos) return Promise.reject('Petra wallet not installed')
      return (await window.aptos.account()).address
    },
    network: async () => {
      if (!window.aptos) return Promise.reject('Petra wallet not installed')
      return window.aptos.network()
    },
    chainId: () => Promise.reject('Not Supported.'),
    disconnect: async () => {
      if (!window.aptos) return Promise.reject('Petra wallet not installed')
      return window.aptos.disconnect()
    },
    signAndSubmitTransaction: async (payload) => {
      if (!window.aptos) return Promise.reject('Petra wallet not installed')
      return window.aptos.signAndSubmitTransaction({
        ...payload,
        arguments: payload.arguments.map(toStringRecursive),
      })
    },
    onAccountChanged: (listener) => {
      if (!window.aptos) throw new Error('Petra wallet not installed.')
      window.aptos.on('accountChanged', (params) =>
        listener((params as { address?: string }).address),
      )
    },
    onNetworkChanged: (listener) => {
      if (!window.aptos) throw new Error('Petra wallet not installed.')
      window.aptos.on('networkChanged', listener)
    },
  }
  return wallet
}
