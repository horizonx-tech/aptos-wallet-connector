import { Types } from 'aptos'

export type WalletConnector = <T>() => Promise<WalletInterface<T> | undefined>

export type Account = {
  address: Types.Address
  publicKey: Types.HexEncodedBytes
}
export type WalletInterface<T = string> = {
  type: T
  connect: () => Promise<Account | undefined>
  account: () => Promise<Account | undefined>
  network: () => Promise<string>
  chainId: () => Promise<number>
  isConnected: () => Promise<boolean>
  disconnect: () => Promise<any>
  signAndSubmitTransaction: (
    payload: Types.EntryFunctionPayload,
    options?: Partial<Types.SubmitTransactionRequest>,
  ) => Promise<Types.HashValue>
  onAccountChanged?: (
    listener: (account: Account | undefined) => void,
  ) => VoidFunction
  onNetworkChanged?: (
    listener: (payload: { network: string; chainId?: number }) => void,
  ) => VoidFunction
}
