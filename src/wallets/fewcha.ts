import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  if (!window.fewcha) return Promise.reject('Fewcha wallet not installed.')

  await window.fewcha.connect()
  const fewchaAccount = await window.fewcha.account()
  if (!fewchaAccount) return
  const wallet: WalletInterface<'fewcha'> = {
    type: 'fewcha',
    account: async () => {
      if (!window.fewcha) return Promise.reject('Fewcha wallet not installed.')
      const {
        data: { address },
      } = await window.fewcha.account()
      return address
    },
    network: async () => {
      if (!window.fewcha) return Promise.reject('Fewcha wallet not installed.')
      const res = await window.fewcha.getNetwork()
      return res.data
    },
    chainId: async () => {
      if (!window.fewcha) return Promise.reject('Fewcha wallet not installed.')
      const res = await window.fewcha.sdk.getChainId()
      return res.data
    },
    isConnected: async () => {
      if (!window.fewcha) return Promise.reject(error)
      const res = await window.fewcha.isConnected()
      return !!res.data
    },
    disconnect: async () => {
      if (!window.fewcha) return Promise.reject('Fewcha wallet not installed.')
      return window.fewcha.disconnect()
    },
    signAndSubmitTransaction: async (payload, options) => {
      if (!window.fewcha) return Promise.reject('Fewcha wallet not installed.')
      const { data } = await window.fewcha.generateTransaction(
        { ...payload, arguments: payload.arguments.map(toStringRecursive) },
        options,
      )
      const res = await window.fewcha.signAndSubmitTransaction(data)
      return res.data
    },
  }
  return wallet
}
