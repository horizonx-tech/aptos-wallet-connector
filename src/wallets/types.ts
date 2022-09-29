import { Types } from 'aptos'

export type WalletConnector = <T>() => Promise<WalletInterface<T> | undefined>

export type WalletInterface<T = string> = {
  type: T
  account: () => Promise<Types.Address | undefined>
  network: () => Promise<string>
  chainId: () => Promise<number>
  isConnected: () => Promise<boolean>
  disconnect: () => Promise<any>
  signAndSubmitTransaction: (
    payload: Types.EntryFunctionPayload,
    options?: Partial<Types.SubmitTransactionRequest>,
  ) => Promise<Types.HashValue>
  onAccountChanged?: (
    listener: (address: Types.Address | undefined) => void,
  ) => VoidFunction | void
  onNetworkChanged?: (listener: (network: string) => void) => void
  onChainChanged?: (listener: (chain: number) => void) => void
}
