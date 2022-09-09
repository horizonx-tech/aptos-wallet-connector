import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  if (!window.fewcha) return Promise.reject('Pontem wallet not installed.')

  await window.pontem.connect()
  const pontemAccount = await window.pontem.account()
  if (!pontemAccount) return
  const wallet: WalletInterface<'pontem'> = {
    type: 'pontem',
    account: async () => {
      if (!window.pontem) return Promise.reject('Pontem wallet not installed.')
      return window.pontem.account()
    },
    disconnect: async () => Promise.reject('Not supported'),
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
  }
  return wallet
}
