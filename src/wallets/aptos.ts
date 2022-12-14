import { ERRORS } from 'src/utils/errors'
import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

export const connect = async () => {
  const aptosRes = await wallet.connect()
  if (!aptosRes) return
  return wallet
}

const wallet: WalletInterface<'aptos'> = {
  type: 'aptos',
  connect: async () => {
    if (!window.aptos) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.aptos.connect().catch(handleReject)
  },
  account: async () => {
    if (!window.aptos) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.aptos.account().catch(handleReject)
  },
  network: async () => {
    if (!window.aptos) return Promise.reject(ERRORS.NOT_INSTALLED)
    const res = await window.aptos.network().catch(handleReject)
    return res.networkName
  },
  chainId: () => Promise.reject('Not Supported.'),
  isConnected: () => {
    if (!window.aptos) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.aptos.isConnected().catch(handleReject)
  },
  disconnect: async () => {
    if (!window.aptos) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.aptos.disconnect().catch(handleReject)
  },
  signAndSubmitTransaction: async (payload) => {
    if (!window.aptos) return Promise.reject(ERRORS.NOT_INSTALLED)
    const tx = await window.aptos
      .signAndSubmitTransaction({
        ...payload,
        arguments: payload.arguments.map(toStringRecursive),
      })
      .catch(handleReject)
    return tx.hash
  },
  onAccountChanged: (listener) => {
    if (!window.aptos) throw new Error(ERRORS.NOT_INSTALLED)
    window.aptos.onAccountChange((account) =>
      listener('address' in account ? account : undefined),
    )
    return () => {
      if (!window.aptos) return
      delete window.aptos.eventListenerMap.accountChanged
    }
  },
  onNetworkChanged: (listener) => {
    if (!window.aptos) throw new Error(ERRORS.NOT_INSTALLED)
    window.aptos.onNetworkChange((network) => listener({ network }))
    return () => {
      if (!window.aptos) return
      delete window.aptos.eventListenerMap.networkChanged
    }
  },
}

const handleReject = (e: any) => {
  if (e.code === 4100) return Promise.reject(ERRORS.NOT_CONNECTED)
  if (e.code === 4001) return Promise.reject(ERRORS.CANCELLED)
  return Promise.reject(e)
}
