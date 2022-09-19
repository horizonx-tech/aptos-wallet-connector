import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  if (!window.fewcha) return Promise.reject('Pontem wallet not installed.')

  await window.pontem.connect()
  const pontemAccount = await window.pontem.account()
  if (!pontemAccount) return
  const chainId = async () => {
    if (!window.pontem) return Promise.reject('Pontem wallet not installed.')
    return +(await window.pontem.chainId())
  }
  const wallet: WalletInterface<'pontem'> = {
    type: 'pontem',
    account: async () => {
      if (!window.pontem) return Promise.reject('Pontem wallet not installed.')
      return window.pontem.account()
    },
    network: async () => {
      if (!window.pontem) return Promise.reject('Pontem wallet not installed.')
      return (await window.pontem.network()).name
    },
    chainId,
    disconnect: async () => {
      if (!window.pontem) return Promise.reject('Pontem wallet not installed.')
      return window.pontem.disconnect()
    },
    signAndSubmitTransaction: async (payload, options) => {
      if (!window.pontem) return Promise.reject('Pontem wallet not installed.')
      return window.pontem.signAndSubmit(
        { ...payload, arguments: payload.arguments.map(toStringRecursive) },
        options,
      )
    },
    onAccountChanged: (listener) => {
      if (!window.pontem) throw new Error('Pontem wallet not installed.')
      return window.pontem.onChangeAccount(listener)
    },
    onNetworkChanged: (listener) => {
      if (!window.pontem) throw new Error('Pontem wallet not installed.')
      return window.pontem.onChangeNetwork(listener)
    },
    onChainChanged: (listener) => {
      if (!window.pontem) throw new Error('Pontem wallet not installed.')
      return window.pontem.onChangeNetwork(() => chainId().then(listener))
    },
  }
  return wallet
}
