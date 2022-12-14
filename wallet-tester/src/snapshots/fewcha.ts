import { WalletSnapshot } from './types'

const SNAPSHOT = `{
  "channel": {},
  "isFewcha": "boolean",
  "connect": "function",
  "disconnect": "function",
  "isConnected": "function",
  "account": "function",
  "getNetwork": "function",
  "getNetworkURL": "function",
  "getBalance": "function",
  "generateTransaction": "function",
  "generateRawTransaction": "function",
  "generateSignSubmitTransaction": "function",
  "generateSignSubmitRawTransaction": "function",
  "generateSignSubmitWaitForTransaction": "function",
  "signMessage": "function",
  "simulateTransaction": "function",
  "signTransaction": "function",
  "submitTransaction": "function",
  "signAndSubmitTransaction": "function",
  "generateBCSTransaction": "function",
  "generateBCSSimulation": "function",
  "submitSignedBCSTransaction": "function",
  "submitBCSSimulation": "function",
  "aptos": {
    "generateTransaction": "function",
    "generateRawTransaction": "function",
    "generateSignSubmitTransaction": "function",
    "generateSignSubmitRawTransaction": "function",
    "generateSignSubmitWaitForTransaction": "function",
    "signMessage": "function",
    "simulateTransaction": "function",
    "signTransaction": "function",
    "submitTransaction": "function",
    "signAndSubmitTransaction": "function",
    "generateBCSTransaction": "function",
    "generateBCSSimulation": "function",
    "submitSignedBCSTransaction": "function",
    "submitBCSSimulation": "function",
    "getAccount": "function",
    "getAccountTransactions": "function",
    "getAccountModules": "function",
    "getAccountModule": "function",
    "getAccountResources": "function",
    "getAccountResource": "function",
    "getEventsByEventKey": "function",
    "getEventsByEventHandle": "function",
    "getEventsByCreationNumber": "function",
    "getTransactions": "function",
    "getTransactionByHash": "function",
    "getTransactionByVersion": "function",
    "transactionPending": "function",
    "waitForTransactionWithResult": "function",
    "waitForTransaction": "function",
    "getLedgerInfo": "function",
    "getChainId": "function",
    "getTableItem": "function",
    "lookupOriginalAddress": "function",
    "getBlockByHeight": "function",
    "getBlockByVersion": "function"
  },
  "sdk": {
    "generateTransaction": "function",
    "generateRawTransaction": "function",
    "generateSignSubmitTransaction": "function",
    "generateSignSubmitRawTransaction": "function",
    "generateSignSubmitWaitForTransaction": "function",
    "signMessage": "function",
    "simulateTransaction": "function",
    "signTransaction": "function",
    "submitTransaction": "function",
    "signAndSubmitTransaction": "function",
    "generateBCSTransaction": "function",
    "generateBCSSimulation": "function",
    "submitSignedBCSTransaction": "function",
    "submitBCSSimulation": "function",
    "getAccount": "function",
    "getAccountTransactions": "function",
    "getAccountModules": "function",
    "getAccountModule": "function",
    "getAccountResources": "function",
    "getAccountResource": "function",
    "getEventsByEventKey": "function",
    "getEventsByEventHandle": "function",
    "getEventsByCreationNumber": "function",
    "getTransactions": "function",
    "getTransactionByHash": "function",
    "getTransactionByVersion": "function",
    "transactionPending": "function",
    "waitForTransactionWithResult": "function",
    "waitForTransaction": "function",
    "getLedgerInfo": "function",
    "getChainId": "function",
    "getTableItem": "function",
    "lookupOriginalAddress": "function",
    "getBlockByHeight": "function",
    "getBlockByVersion": "function"
  },
  "sui": {},
  "prototype": {
    "constructor": "string",
    "send": "string"
  }
}`

export const FEWCHA_SNAPSHOT: WalletSnapshot = {
  version: '0.4.6',
  snapshot: SNAPSHOT,
}
