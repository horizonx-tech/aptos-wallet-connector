import { Types } from 'aptos'

interface PontemWalletProvider {
  connect: () => Promise<PontemWalletProvider>
  disconnect: () => Promise<void>
  account: () => Promise<Types.Address>
  network: () => Promise<{
    api: string
    chainId: string
    name: string
  }>
  chainId: () => Promise<string>
  signAndSubmit: (
    payload: Types.EntryFunctionPayload,
    options?: Types.SubmitTransactionRequest,
  ) => Promise<TransactionResponse>
  onChangeAccount: (
    listner: (address: string | undefined) => void,
  ) => VoidFunction
  onChangeNetwork: (listner: (network: string) => void) => VoidFunction
}

interface TransactionResponse {
  id: number
  origin: string
  payload: Types.EntryFunctionPayload
  result: {
    expiration_timestamp_secs: Types.U64
    gas_unit_price: Types.U64
    hash: Types.HashValue
    max_gas_amount: Types.U64
    payload: Types.EntryFunctionPayload
    sender: Types.Address
    sequence_number: Types.U64
    signature: Types.TransactionSignature
  }
  success: boolean
  tabId: number
}
