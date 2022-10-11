import { Types } from 'aptos'

export type WalletConnector = <T>() => Promise<WalletInterface<T> | undefined>

export type WalletInterface<T = string> = {
  type: T
  connect: () => Promise<Types.Address | undefined>
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
  ) => VoidFunction
  onNetworkChanged?: (
    listener: (payload: { network: string; chainId?: number }) => void,
  ) => VoidFunction
}
