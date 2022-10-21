# aptos-wallet-connector

## Detail

Provides a common interface for aptos wallets in a minimal package.

| Function                 | Description                                         | Arguments                                                                                    |
| ------------------------ | --------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| connect                  | connect wallet                                      | -                                                                                            |
| account                  | returns current account                             | -                                                                                            |
| network                  | returns current network name                        | -                                                                                            |
| chainId                  | returns current chainId                             | -                                                                                            |
| isConnected              | returns connected or not                            | -                                                                                            |
| disconnect               | disconnect wallet                                   | -                                                                                            |
| signAndSubmitTransaction | call connected wallet to sign and submit transction | `payload`: Transaction Payload<br> (optional) `options`: TransactionOptions                  |
| onAccountChanged         | add listener callback on account changed            | `listener`: (address: string \| undefined) => VoidFunction (removeListener)                  |
| onNetworkChanged         | add listener callback on network changed            | `listener`: (payload: { network: string, chainId?: number}) => VoidFunction (removeListener) |

## Installation

```
yarn add @horizonx/aptos-wallet-connector
```

or

```
npm install @horizonx/aptos-wallet-connector
```

<details>
<summary>Some wallets require additional dependencies.</summary>

- Blocto
  
  Dependencies:
  ```
  @blocto/sdk
  ```
  Example:
  ```typescript
  import BloctoSDK from '@blocto/sdk'
  import { connect, WalletInterface, WalletType } from '@horizonx/aptos-wallet-connector'

  const walletClient: WalletInterface = await connect('blocto', new BloctoSDK({ aptos: { chainId: 1 } }).aptos!)
  ```

</details>

<br>

## How to Use

```typescript
import { connect, connectWalletWithProvider, WalletInterface, WalletType } from '@horizonx/aptos-wallet-connector'

const type: WalletType = 'aptos' // 'aptos'(petra) | 'fewcha' | 'martian' | 'pontem'
const walletClient: WalletInterface = await connect(type)

// If an external provider is required, it must be passed as the second argument.
const type: WalletType = 'blocto' // 'blocto'
const walletClient: WalletInterface = await connect(type, provider)
```

See [code example](https://github.com/horizonx-tech/aptos-module-explorer/blob/main/src/hooks/useWallet.tsx).

## Features

| Function                | Description                                        | Arguments                                             |
| ----------------------- | -------------------------------------------------- | ----------------------------------------------------- |
| connect                 | connect a wallet                                   | `type`: Wallet Type<br>`provider?`: External Provider |
| isSupportedWalletType   | returns passed arg is supported wallet type or not | `arg`: any                                            |
| lastConnectedWalletType | returns last connected wallet type                 | -                                                     |

<br>

| Constant          | Description                         | type                      |
| ----------------- | ----------------------------------- | ------------------------- |
| SUPPORTED_WALLETS | array of supported wallet type strs | WalletType[]              |
| ERRORS            | dictionary of errors                | Record<ErrorType, string> |

## Errors

| ErrorType     | Description               |
| ------------- | ------------------------- |
| NOT_INSTALLED | wallet not installed      |
| NOT_CONNECTED | wallet not connected      |
| CANCELLED     | request cancelled by user |

## Supported Wallets

|                          | [Petra](https://petra.app/) | [Fewcha](https://fewcha.app/) | [Martian](https://martianwallet.xyz/) | [Pontem](https://pontem.network/) | [Blocto](https://portto.com/download) |
| ------------------------ | --------------------------- | ----------------------------- | ------------------------------------- | --------------------------------- | ------------------------------------- |
| version                  | 1.0.5                       | 0.4.8                         | 1.1.4                                 | 2.1.1                             | 0.3.9-beta                            |
| connect                  | :white_check_mark:          | :white_check_mark:            | :white_check_mark:                    | :white_check_mark:                | :white_check_mark:                    |
| account                  | :white_check_mark:          | :white_check_mark:            | :white_check_mark:                    | :white_check_mark:                | :white_check_mark:                    |
| network                  | :white_check_mark:          | :white_check_mark:            | :white_check_mark:                    | :white_check_mark:                | :white_check_mark:                    |
| chainId                  | :heavy_minus_sign:          | :white_check_mark:            | :white_check_mark:                    | :white_check_mark:                | :white_check_mark:                    |
| isConnected              | :white_check_mark:          | :white_check_mark:            | :white_check_mark:                    | :white_check_mark:                | :white_check_mark:                    |
| disconnect               | :white_check_mark:          | :white_check_mark:            | :white_check_mark:                    | :white_check_mark:                | :white_check_mark:                    |
| signAndSubmitTransaction | :white_check_mark:          | :white_check_mark:            | :white_check_mark:                    | :white_check_mark:                | :white_check_mark:                    |
| onAccountChanged         | :white_check_mark:          | :heavy_minus_sign:            | :white_check_mark:                    | :white_check_mark:                | :heavy_minus_sign:                    |
| onNetworkChanged         | :white_check_mark:          | :heavy_minus_sign:            | :white_check_mark:                    | :white_check_mark:                | :heavy_minus_sign:                    |
