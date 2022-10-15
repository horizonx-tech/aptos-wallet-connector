import { WalletSnapshot } from './types'

const SNAPSHOT = `{
  "eventListenerMap": {
    "accountChanged": "function",
    "networkChanged": "function"
  },
  "requestId": "number",
  "account": "function",
  "connect": "function",
  "disconnect": "function",
  "isConnected": "function",
  "network": "function",
  "signAndSubmitTransaction": "function",
  "signMessage": "function",
  "signTransaction": "function",
  "prototype": {
    "constructor": "string",
    "proxiedMethod": "string",
    "forwardCall": "string"
  }
}`

export const APTOS_SNAPSHOT: WalletSnapshot = {
  version: '1.0.2',
  snapshot: SNAPSHOT,
}
