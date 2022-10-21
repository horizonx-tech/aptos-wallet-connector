import { AptosProviderInterface } from '@blocto/sdk'
import { ERRORS } from 'src/utils/errors'
import { WalletInterface } from './types'
import { toStringRecursive } from './utils'

let provider: AptosProviderInterface | undefined

export const connect = async (_provider: AptosProviderInterface) => {
  if (!_provider) return Promise.reject(ERRORS.PROVIDER_REQUIRED)
  provider = _provider
  const aptosRes = await wallet.connect()
  if (!aptosRes) return
  return wallet
}

const wallet: WalletInterface<'blocto'> = {
  type: 'blocto',
  connect: async () => {
    if (!provider) return Promise.reject(ERRORS.NOT_CONNECTED)
    const { address, publicKey } = await provider.connect()
    if (!address || !publicKey || !publicKey.length)
      return Promise.reject(ERRORS.NOT_CONNECTED)
    return { address, publicKey: publicKey[0] }
  },
  account: async () => {
    if (!provider) return Promise.reject(ERRORS.NOT_CONNECTED)
    const { address, publicKey } = provider.publicAccount
    if (!address || !publicKey || !publicKey.length)
      return Promise.reject(ERRORS.NOT_CONNECTED)
    return { address, publicKey: publicKey[0] }
  },
  network: async () => {
    if (!provider) return Promise.reject(ERRORS.NOT_CONNECTED)
    const { name } = await provider.network()
    if (!name) return Promise.reject(ERRORS.NOT_CONNECTED)
    return name
  },
  chainId: async () => {
    if (!provider) return Promise.reject(ERRORS.NOT_CONNECTED)
    // @ts-ignore
    return provider.chainId
  },
  isConnected: () => {
    if (!provider) return Promise.reject(ERRORS.NOT_CONNECTED)
    return provider.isConnected().catch(handleReject)
  },
  disconnect: async () => {
    if (!provider) return Promise.reject(ERRORS.NOT_CONNECTED)
    await provider.disconnect().catch(handleReject)
    provider = undefined
    return
  },
  signAndSubmitTransaction: async (payload) => {
    if (!provider) return Promise.reject(ERRORS.NOT_CONNECTED)
    const tx = await provider
      .signAndSubmitTransaction({
        ...payload,
        arguments: payload.arguments.map(toStringRecursive),
      })
      .catch(handleReject)
    return tx.hash
  },
}

const handleReject = (e: any) => {
  return Promise.reject(e)
}
