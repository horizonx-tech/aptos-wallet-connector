import { ERRORS } from 'src/utils/errors'
import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  const pontemAccount = await wallet.connect()
  if (!pontemAccount) return
  return wallet
}

const chainId = async () => {
  if (!window.pontem) return Promise.reject(ERRORS.NOT_INSTALLED)
  const chainId = await window.pontem.chainId().catch(handleReject)
  return +chainId
}
const wallet: WalletInterface<'pontem'> = {
  type: 'pontem',
  connect: () => {
    if (!window.pontem) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.pontem.connect().catch(handleReject)
  },
  account: async () => {
    if (!window.pontem) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.pontem.account().catch(handleReject)
  },
  network: async () => {
    if (!window.pontem) return Promise.reject(ERRORS.NOT_INSTALLED)
    const res = await window.pontem.network().catch(handleReject)
    return res.name
  },
  chainId,
  isConnected: () => {
    if (!window.pontem) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.pontem.isConnected()
  },
  disconnect: async () => {
    if (!window.pontem) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.pontem.disconnect()
  },
  signAndSubmitTransaction: async (payload, options) => {
    if (!window.pontem) return Promise.reject(ERRORS.NOT_INSTALLED)
    const res = await window.pontem
      .signAndSubmit(
        { ...payload, arguments: payload.arguments.map(toStringRecursive) },
        options,
      )
      .catch(handleReject)
    return res.result.hash
  },
  onAccountChanged: (listener) => {
    if (!window.pontem) throw new Error(ERRORS.NOT_INSTALLED)
    return window.pontem.onChangeAccount(listener)
  },
  onNetworkChanged: (listener) => {
    if (!window.pontem) throw new Error(ERRORS.NOT_INSTALLED)
    return window.pontem.onChangeNetwork(async ({ name, chainId }) => {
      listener({
        network: name,
        chainId: chainId != null ? +chainId : undefined,
      })
    })
  },
}

const handleReject = (e: any) => {
  if (e.code === 401) return Promise.reject(ERRORS.NOT_CONNECTED)
  if (e.code === 403) return Promise.reject(ERRORS.CANCELLED)
  return Promise.reject(e)
}
