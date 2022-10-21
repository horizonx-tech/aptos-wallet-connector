import { ERRORS } from 'src/utils/errors'
import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  const martianRes = await wallet.connect()
  if (!martianRes) return
  return wallet
}

const chainId = async () => {
  if (!window.martian) return Promise.reject(ERRORS.NOT_INSTALLED)
  const res = await window.martian.getChainId().catch(handleReject)
  return res.chainId
}

const wallet: WalletInterface<'martian'> = {
  type: 'martian',
  connect: async () => {
    if (!window.martian) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.martian.connect().catch(handleReject)
  },
  account: async () => {
    if (!window.martian) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.martian.account().catch(handleReject)
  },
  network: async () => {
    if (!window.martian) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.martian.network().catch(handleReject)
  },
  chainId,
  isConnected: () => {
    if (!window.martian) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.martian.isConnected().catch(handleReject)
  },
  disconnect: async () => {
    if (!window.martian) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.martian.disconnect().catch(handleReject)
  },
  signAndSubmitTransaction: async (payload, options) => {
    if (!window.martian?.address) return Promise.reject(ERRORS.NOT_INSTALLED)
    const tx = await window.martian
      .generateTransaction(
        window.martian.address,
        { ...payload, arguments: payload.arguments.map(toStringRecursive) },
        options,
      )
      .catch(handleReject)
    return window.martian.signAndSubmitTransaction(tx).catch(handleReject)
  },
  onAccountChanged: (listener) => {
    if (!window.martian) throw new Error(ERRORS.NOT_INSTALLED)
    window.martian.onAccountChange(async (address) => {
      if (!window.martian) return listener(undefined)
      const account = await window.martian.account().catch(handleReject)
      if (address !== account.address) return
      listener(account)
    })
    return () => {
      if (!window.martian) return
      delete window.martian.eventListenerMap.changeAddress
    }
  },
  onNetworkChanged: (listener) => {
    if (!window.martian) throw new Error(ERRORS.NOT_INSTALLED)
    window.martian.onNetworkChange(async (network) =>
      listener({
        network,
        chainId: (await window.martian?.getChainId())?.chainId,
      }),
    )
    return () => {
      if (!window.martian) return
      delete window.martian.eventListenerMap.networkChange
    }
  },
}

const handleReject = (e: any) => {
  if (e === 'Unauthorized') return Promise.reject(ERRORS.NOT_CONNECTED)
  if (e === 'User rejected the request') return Promise.reject(ERRORS.CANCELLED)
  return Promise.reject(e)
}
