import { Types } from 'aptos'

export type WalletConnector = <T>() => Promise<WalletInterface<T> | undefined>

export type WalletInterface<T = string> = {
  type: T
  account: () => Promise<string | undefined>
  network: () => Promise<string>
  chainId: () => Promise<number>
  disconnect: () => Promise<any>
  signAndSubmitTransaction: (
    payload: Types.EntryFunctionPayload,
    options?: Types.SubmitTransactionRequest,
  ) => Promise<string>
  onAccountChanged?: (
    listener: (address: Types.Address | undefined) => void,
  ) => VoidFunction | void
  onNetworkChanged?: (listener: (network: string) => void) => void
  onChainChanged?: (listener: (chain: number) => void) => void
}
