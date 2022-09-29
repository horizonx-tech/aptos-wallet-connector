import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  if (!window.martian) return Promise.reject(error)
  const martianRes = await window.martian.connect()
  if (!martianRes) return
  return wallet
}

const chainId = async () => {
  if (!window.martian) return Promise.reject(error)
  return (await window.martian.getChainId()).chainId
}

const wallet: WalletInterface<'martian'> = {
  type: 'martian',
  account: async () => {
    if (!window.martian) return Promise.reject(error)
    return (await window.martian.account()).address
  },
  network: async () => {
    if (!window.martian) return Promise.reject(error)
    return window.martian.network()
  },
  chainId,
  isConnected: () => {
    if (!window.martian) return Promise.reject(error)
    return window.martian.isConnected()
  },
  disconnect: async () => {
    if (!window.martian) return Promise.reject(error)
    return window.martian.disconnect()
  },
  signAndSubmitTransaction: async (payload, options) => {
    if (!window.martian?.address) return Promise.reject(error)
    const tx = await window.martian.generateTransaction(
      window.martian.address,
      { ...payload, arguments: payload.arguments.map(toStringRecursive) },
      options,
    )
    return window.martian.signAndSubmitTransaction(tx)
  },
  onAccountChanged: (listener) => {
    if (!window.martian) throw new Error(error)
    return window.martian.onAccountChange(listener)
  },
  onNetworkChanged: (listener) => {
    if (!window.martian) throw new Error(error)
    return window.martian.onNetworkChange(listener)
  },
  onChainChanged: (listener) => {
    if (!window.martian) throw new Error(error)
    return window.martian.onNetworkChange(() => chainId().then(listener))
  },
}

const error = 'Martian wallet not installed'
