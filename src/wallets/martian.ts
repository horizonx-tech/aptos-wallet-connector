import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  if (!window.martian) return Promise.reject('Martian wallet not installed.')

  const martianRes = await window.martian.connect()
  if (!martianRes) return
  const wallet: WalletInterface<'martian'> = {
    type: 'martian',
    account: async () => {
      if (!window.martian)
        return Promise.reject('Martian wallet not installed.')
      return (await window.martian.account()).address
    },
    disconnect: async () => {
      if (!window.martian)
        return Promise.reject('Martian wallet not installed.')
      return window.martian.disconnect()
    },
    signAndSubmitTransaction: async (payload, options) => {
      if (!window.martian || !window.martian.address)
        return Promise.reject('Martian wallet not installed.')
      const tx = await window.martian.generateTransaction(
        window.martian.address,
        { ...payload, arguments: payload.arguments.map(toStringRecursive) },
        options,
      )
      return window.martian.signAndSubmitTransaction(tx)
    },
  }
  return wallet
}
