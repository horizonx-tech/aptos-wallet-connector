import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  const pontemAccount = await wallet.connect()
  if (!pontemAccount) return
  return wallet
}

const chainId = async () => {
  if (!window.pontem) return Promise.reject(error)
  return +(await window.pontem.chainId())
}
const wallet: WalletInterface<'pontem'> = {
  type: 'pontem',
  connect: () => {
    if (!window.pontem) return Promise.reject(error)
    return window.pontem.connect()
  },
  account: async () => {
    if (!window.pontem) return Promise.reject(error)
    return window.pontem.account()
  },
  network: async () => {
    if (!window.pontem) return Promise.reject(error)
    return (await window.pontem.network()).name
  },
  chainId,
  isConnected: () => {
    if (!window.pontem) return Promise.reject(error)
    return window.pontem.isConnected()
  },
  disconnect: async () => {
    if (!window.pontem) return Promise.reject(error)
    return window.pontem.disconnect()
  },
  signAndSubmitTransaction: async (payload, options) => {
    if (!window.pontem) return Promise.reject(error)
    const res = await window.pontem.signAndSubmit(
      { ...payload, arguments: payload.arguments.map(toStringRecursive) },
      options,
    )
    return res.result.hash
  },
  onAccountChanged: (listener) => {
    if (!window.pontem) throw new Error(error)
    return window.pontem.onChangeAccount(listener)
  },
  onNetworkChanged: (listener) => {
    if (!window.pontem) throw new Error(error)
    return window.pontem.onChangeNetwork(listener)
  },
  onChainChanged: (listener) => {
    if (!window.pontem) throw new Error(error)
    return window.pontem.onChangeNetwork(() => chainId().then(listener))
  },
}

const error = 'Pontem wallet not installed'
