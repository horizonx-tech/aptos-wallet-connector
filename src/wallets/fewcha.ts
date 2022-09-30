import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  const fewchaAccount = wallet.connect()
  if (!fewchaAccount) return
  return wallet
}

const account = async () => {
  if (!window.fewcha) return Promise.reject(error)
  const {
    data: { address },
  } = await window.fewcha.account()
  return address
}
const wallet: WalletInterface<'fewcha'> = {
  type: 'fewcha',
  connect: async () => {
    if (!window.fewcha) return Promise.reject(error)
    await window.fewcha.connect()
    return account()
  },
  account,
  network: async () => {
    if (!window.fewcha) return Promise.reject(error)
    const res = await window.fewcha.getNetwork()
    return res.data
  },
  chainId: async () => {
    if (!window.fewcha) return Promise.reject(error)
    const res = await window.fewcha.sdk.getChainId()
    return res.data
  },
  isConnected: async () => {
    if (!window.fewcha) return Promise.reject(error)
    const res = await window.fewcha.isConnected()
    return !!res.data
  },
  disconnect: async () => {
    if (!window.fewcha) return Promise.reject(error)
    return window.fewcha.disconnect()
  },
  signAndSubmitTransaction: async (payload, options) => {
    if (!window.fewcha) return Promise.reject(error)
    const { data } = await window.fewcha.generateTransaction(
      { ...payload, arguments: payload.arguments.map(toStringRecursive) },
      options,
    )
    const res = await window.fewcha.signAndSubmitTransaction(data)
    return res.data
  },
}

const error = 'Fewcha wallet not installed'
