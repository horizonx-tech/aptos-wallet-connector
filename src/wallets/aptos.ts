import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  if (!window.aptos) return Promise.reject(error)
  const aptosRes = await window.aptos.connect()
  if (!aptosRes) return
  return wallet
}

const wallet: WalletInterface<'aptos'> = {
  type: 'aptos',
  account: async () => {
    if (!window.aptos) return Promise.reject(error)
    return (await window.aptos.account()).address
  },
  network: async () => {
    if (!window.aptos) return Promise.reject(error)
    return window.aptos.network()
  },
  chainId: () => Promise.reject('Not Supported.'),
  isConnected: () => {
    if (!window.aptos) return Promise.reject(error)
    return window.aptos.isConnected()
  },
  disconnect: async () => {
    if (!window.aptos) return Promise.reject(error)
    return window.aptos.disconnect()
  },
  signAndSubmitTransaction: async (payload) => {
    if (!window.aptos) return Promise.reject(error)
    const tx = await window.aptos.signAndSubmitTransaction({
      ...payload,
      arguments: payload.arguments.map(toStringRecursive),
    })
    return tx.hash
  },
  onAccountChanged: (listener) => {
    if (!window.aptos) throw new Error(error)
    window.aptos.on('accountChanged', (params) =>
      listener((params as { address?: string }).address),
    )
  },
  onNetworkChanged: (listener) => {
    if (!window.aptos) throw new Error(error)
    window.aptos.on('networkChanged', listener)
  },
}

const error = 'Petra wallet not installed'
