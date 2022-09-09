import { WalletInterface } from './types'

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
    signAndSubmitTransaction: async (...args) => {
      if (!window.fewcha) return Promise.reject('Fewcha wallet not installed.')
      const { data } = await window.fewcha.generateTransaction(...args)
      return window.fewcha.signAndSubmitTransaction(data)
    },
  }
  return wallet
}
