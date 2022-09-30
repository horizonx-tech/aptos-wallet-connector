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
    const res = await window.aptos.connect().catch(handleReject)
    return res.address
  },
  account: async () => {
    if (!window.aptos) return Promise.reject(ERRORS.NOT_INSTALLED)
    const res = await window.aptos.account().catch(handleReject)
    return res.address
  },
  network: async () => {
    if (!window.aptos) return Promise.reject(ERRORS.NOT_INSTALLED)
    return window.aptos.network().catch(handleReject)
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
    window.aptos.on('accountChanged', (params) =>
      listener((params as { address?: string }).address),
    )
  },
  onNetworkChanged: (listener) => {
    if (!window.aptos) throw new Error(ERRORS.NOT_INSTALLED)
    window.aptos.on('networkChanged', listener)
  },
}

const handleReject = (e: any) => {
  if (e.code === 4100) return Promise.reject(ERRORS.NOT_CONNECTED)
  if (e.code === 4001) return Promise.reject(ERRORS.CANCELLED)
  return Promise.reject(e)
}
