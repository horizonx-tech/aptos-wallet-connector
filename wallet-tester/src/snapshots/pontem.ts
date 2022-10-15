import { WalletSnapshot } from './types'

const SNAPSHOT = `{
  "version": "string",
  "ext": {
    "inpageStream": {
      "readable": "boolean",
      "writable": "boolean",
      "allowHalfOpen": "boolean"
    }
  },
  "eventListeners": {
    "onAccountChange": [
      "function"
    ],
    "onNetworkChange": [
      "function"
    ]
  },
  "requests": {},
  "prototype": {
    "constructor": "string",
    "onAccountChange": "string",
    "onNetworkChange": "string",
    "onChangeNetwork": "string",
    "onChangeAccount": "string",
    "connect": "string",
    "chainId": "string",
    "network": "string",
    "isConnected": "string",
    "disconnect": "string",
    "signAndSubmit": "string",
    "signTransaction": "string",
    "signMessage": "string",
    "account": "string",
    "publicKey": "string"
  }
}`

export const PONTEM_SNAPSHOT: WalletSnapshot = {
  version: '2.0.4',
  snapshot: SNAPSHOT,
}
