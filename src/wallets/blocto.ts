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
    const { address } = await provider.connect()
    if (!address) return Promise.reject(ERRORS.NOT_CONNECTED)
    return address
  },
  account: async () => {
    if (!provider) return Promise.reject(ERRORS.NOT_CONNECTED)
    const { address } = provider.publicAccount
    if (!address) return Promise.reject(ERRORS.NOT_CONNECTED)
    return address
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
