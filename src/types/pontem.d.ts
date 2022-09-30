import { Types } from 'aptos'

interface PontemWalletProvider {
  connect: () => Promise<Types.Address>
  disconnect: () => Promise<void>
  account: () => Promise<Types.Address>
  network: () => Promise<{
    api: string
    chainId: string
    name: string
  }>
  chainId: () => Promise<string>
  publicKey: () => Promise<string>
  isConnected: () => Promise<boolean>
  signAndSubmit: (
    payload: Types.EntryFunctionPayload,
    options?: Partial<Types.SubmitTransactionRequest>,
  ) => Promise<TransactionResponse>
  onChangeAccount: (
    listner: (address: string | undefined) => void,
  ) => VoidFunction
  onAccountChange: (
    listner: (address: string | undefined) => void,
  ) => VoidFunction
  onChangeNetwork: (listner: (network: string) => void) => VoidFunction
  onNetworkChange: (listner: (network: string) => void) => VoidFunction
}

interface TransactionResponse {
  payload: Types.EntryFunctionPayload
  result: Types.PendingTransaction
}
