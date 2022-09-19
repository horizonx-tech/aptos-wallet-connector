import { Types } from 'aptos'

export type WalletConnector = <T>() => Promise<WalletInterface<T> | undefined>

export type WalletInterface<T = string> = {
  type: T
  account: () => Promise<string | undefined>
  network: () => Promise<string>
  disconnect: () => Promise<any>
  signAndSubmitTransaction: (
    payload: Types.EntryFunctionPayload,
    options?: Types.SubmitTransactionRequest,
  ) => Promise<any>
  onAccountChanged?: (
    listener: (address: Types.Address | undefined) => void,
  ) => VoidFunction | void
  onNetworkChanged?: (listener: (network: string) => void) => void
}
