import { ERRORS } from 'src/utils/errors'
import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  const fewchaAccount = await wallet.connect()
  if (!fewchaAccount) return
  return wallet
}

const wallet: WalletInterface<'fewcha'> = {
  type: 'fewcha',
  connect: async () => {
    if (!window.fewcha) return Promise.reject(ERRORS.NOT_INSTALLED)
    const { data, status } = await window.fewcha.connect()
    if (status !== 200) return handleError(status)
    return data?.address
  },
  account: async () => {
    if (!window.fewcha) return Promise.reject(ERRORS.NOT_INSTALLED)
    const { data, status } = await window.fewcha.account()
    if (status !== 200) return handleError(status)
    return data?.address
  },
  network: async () => {
    if (!window.fewcha) return Promise.reject(ERRORS.NOT_INSTALLED)
    const { data, status } = await window.fewcha.getNetwork()
    if (status !== 200) return handleError(status)
    return data
  },
  chainId: async () => {
    if (!window.fewcha) return Promise.reject(ERRORS.NOT_INSTALLED)
    const { data, status } = await window.fewcha.sdk.getChainId()
    if (status !== 200) return handleError(status)
    return data
  },
  isConnected: async () => {
    if (!window.fewcha) return Promise.reject(ERRORS.NOT_INSTALLED)
    const { data, status } = await window.fewcha.isConnected()
    if (status !== 200) return handleError(status)
    return !!data
  },
  disconnect: async () => {
    if (!window.fewcha) return Promise.reject(ERRORS.NOT_INSTALLED)
    const { data, status } = await window.fewcha.disconnect()
    if (status !== 200) return handleError(status)
    return data
  },
  signAndSubmitTransaction: async (payload, options) => {
    if (!window.fewcha) return Promise.reject(ERRORS.NOT_INSTALLED)
    const { data: tx, status: genTxStatus } =
      await window.fewcha.generateTransaction(
        { ...payload, arguments: payload.arguments.map(toStringRecursive) },
        options,
      )
    if (genTxStatus !== 200) return handleError(genTxStatus)
    const { data, status } = await window.fewcha.signAndSubmitTransaction(tx)
    if (status !== 200) return handleError(genTxStatus)
    return data
  },
}

const handleError = (status: number) => {
  if (status === 403) return Promise.reject(ERRORS.NOT_CONNECTED)
  if (status === 401) return Promise.reject(ERRORS.CANCELLED)
  return Promise.reject(status)
}
