import { Types } from 'aptos'

interface PetraWalletProvider {
  connect: () => Promise<Account>
  isConnected: () => Promise<boolean>
  account: () => Promise<Account>
  network: () => Promise<string>
  signMessage: (message: string) => Promise<{ signedMessages: string }>
  signTransaction: (
    transaction: Types.EntryFunctionPayload,
  ) => Promise<SignTransactionResponse>
  signAndSubmitTransaction: (
    transaction: Types.EntryFunctionPayload,
    options?: Partial<Types.SubmitTransactionRequest>,
  ) => Promise<Types.PendingTransaction>
  disconnect: () => Promise<{}>
  onAccountChange: (listener: (params: string) => void) => void
  onDisconnect: (listener: VoidFunction) => void
  onNetworkChange: (listener: (params: Account | {}) => void) => void
  on: {
    (event: 'accountChanged', listener: (params: Account | {}) => void): void
    (event: 'disconnect', listener: VoidFunction): void
    (event: 'networkChanged', listener: (params: string) => void): void
  }
  eventListenerMap: Partial<
    Record<'accountChanged' | 'disconnect' | 'networkChanged', Function>
  >
}

interface Account {
  address: Types.Address
  publicKey: Types.HexEncodedBytes
}

interface SignTransactionResponse {
  signedTransaction: {
    expiration_timestamp_secs: Types.U64
    gas_unit_price: Types.U64
    max_gas_amount: Types.U64
    payload: Types.EntryFunctionPayload
    sender: Types.Address
    sequence_number: Types.U64
    signature: Types.TransactionSignature
  }
}
