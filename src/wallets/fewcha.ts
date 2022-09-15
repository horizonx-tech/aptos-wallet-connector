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
      return window.fewcha.signAndSubmitTransaction(data)
    },
  }
  return wallet
}
