// see https://docs.martianwallet.xyz/docs/

import { Types } from 'aptos'

interface MartianWalletProvider {
  address?: string
  account: () => Promise<{
    address: Types.Address
    publicKey: Types.HexEncodedBytes
  }>
  network: () => Promise<string>
  connect: () => Promise<{
    address: Types.Address
    id: number
    method: string
    publicKey: Types.HexEncodedBytes
    status: number
    tabId: number
  }>
  createCollection: (
    name: string,
    description: string,
    url: string,
  ) => Promise<string>
  createToken: (
    collectionName: string,
    name: string,
    description: string,
    totalSupply: string,
    url: string,
    royaltyPayeeAddress?: string,
    royaltyPointsDenominator?: number,
    royaltyPointsNumerator?: number,
    propertyKeys?: string[],
    propertyValues?: string[],
    propertyTypes?: string[],
    max?: number,
  ) => Promise<string>
  disconnect: () => Promise<{ method: 'disconnected'; id: number }>
  generateTransaction: (
    sender: Types.Address,
    payload: Types.EntryFunctionPayload,
    options?: Partial<Types.SubmitTransactionRequest>,
  ) => Promise<Uint8Array>
  getAccount: (address: Types.Address) => Promise<Types.AccountData>
  getAccountResources: (
    address: Types.Address,
    query?: { version?: Types.U64 },
  ) => Promise<Types.MoveResource[]>
  getAccountTransactions: (
    address: string,
    query?: { start?: number; limit?: number },
  ) => Promise<Types.HashValue[]>
  getChainId: () => Promise<{ chainId: number }>
  getLedgerInfo: () => Promise<LedgerInfo>
  getTransaction: (transactionHash: string) => Promise<Types.Transaction>
  getTransactions: (query?: {
    start?: number
    limit?: number
  }) => Promise<Types.Transaction[]>
  isConnected: () => Promise<boolean>
  signAndSubmitTransaction: (
    transaction: Transction,
    options?: Partial<Types.SubmitTransactionRequest>,
  ) => Promise<Types.HashValue>
  signGenericTransaction: (
    arguments: GenericTransactionArgument,
  ) => Promise<SignGenericTransactionResponse>
  signMessage: (message: string) => Promise<string>
  signTransaction: (transaction: Transction) => Promise<Uint8Array>
  submitTransaction: (
    signedTransaction: SignedTransaction,
    options?: Partial<Types.SubmitTransactionRequest>,
  ) => Promise<Types.HashValue>
  onAccountChange: (listner: (address: string) => void) => void
  onNetworkChange: (listner: (name: string) => void) => void
  eventListenerMap: Partial<Record<'changeAddress' | 'networkChange', Function>>
}

type SignGenericTransactionResponse = {
  txnHash: Types.HashValue
  success: boolean
  vm_status: string
}

type GenericTransactionArgument = {
  func: string
  args: any[]
  type_args: string[]
}

type LedgerInfo = {
  block_height: string
  chain_id: number
  epoch: string
  ledger_timestamp: string
  ledger_version: string
  node_role: string
  oldest_block_height: string
  oldest_ledger_version: string
}
