import { WalletSnapshot } from './types'

const SNAPSHOT = `{
  "requestId": "number",
  "address": "string",
  "eventListenerMap": {
    "changeAddress": "function",
    "networkChange": "function"
  },
  "prototype": {
    "constructor": "string",
    "onAccountChange": "string",
    "onNetworkChange": "string",
    "connect": "string",
    "isConnected": "string",
    "disconnect": "string",
    "account": "string",
    "getAccount": "string",
    "getAccountResources": "string",
    "getAccountTransactions": "string",
    "signAndSubmitTransaction": "string",
    "generateSignAndSubmitTransaction": "string",
    "generateTransaction": "string",
    "signGenericTransaction": "string",
    "signTransaction": "string",
    "signMessage": "string",
    "submitTransaction": "string",
    "getChainId": "string",
    "getLedgerInfo": "string",
    "getTransactions": "string",
    "getTransaction": "string",
    "transactionPending": "string",
    "getTableItem": "string",
    "createCollection": "string",
    "createToken": "string",
    "publishModule": "string",
    "cancelSubmittedTransactions": "string",
    "network": "string"
  }
}`

export const MARTIAN_SNAPSHOT: WalletSnapshot = {
  version: '1.0.2',
  snapshot: SNAPSHOT,
}
