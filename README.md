# aptos-wallet-connector

## Detail

Provides a common interface for aptos wallets

| Function                 | Description                                         | Arguments                                                                   |
| ------------------------ | --------------------------------------------------- | --------------------------------------------------------------------------- |
| account                  | returns current account                             | -                                                                           |
| network                  | returns current network name                        | -                                                                           |
| chainId                  | returns current chainId                             | -                                                                           |
| disconnect               | disconnect wallet                                   | -                                                                           |
| signAndSubmitTransaction | call connected wallet to sign and submit transction | `payload`: Transaction Payload<br> (optional) `options`: TransactionOptions |
| onAccountChanged         | add listener callback on account changed            | `listener`: (address: string \| undefined) => void                          |
| onNetworkChanged         | add listener callback on network changed            | `listener`: (network: string) => void                                       |
| onChainChanged           | add listener callback on chain changed              | `listener`: (chainId: number) => void                                       |


## Installation

```
yarn add @horizonx/aptos-wallet-connector
```

or

```
npm install @horizonx/aptos-wallet-connector
```


## How to Use

```typescript
import { connect, WalletInterface, WalletType } from 'aptos-wallet-connector'

const type: WalletType = 'aptos' // 'aptos'(petra) | 'fewcha' | 'martian' | 'pontem'
const walletClient: WalletInterface = await connect(type) //
```

See [code example](https://github.com/horizonx-tech/aptos-module-explorer/blob/main/src/hooks/useWallet.tsx).

## Supported Wallets

|                          | [Petra](https://petra.app/) | [Fewcha](https://fewcha.app/) | [Martian](https://martianwallet.xyz/) | [Pontem](https://pontem.network/) |
| ------------------------ | --------------------------- | ----------------------------- | ------------------------------------- | --------------------------------- |
| version                  | 0.1.12                      | 0.4.2                         | 0.2.2                                 | 1.6.1                             |
| account                  | :white_check_mark:          | :white_check_mark:            | :white_check_mark:                    | :white_check_mark:                |
| network                  | :white_check_mark:          | :heavy_minus_sign:            | :white_check_mark:                    | :white_check_mark:                |
| chainId                  | :heavy_minus_sign:          | :heavy_minus_sign:            | :white_check_mark:                    | :white_check_mark:                |
| disconnect               | :white_check_mark:          | :white_check_mark:            | :white_check_mark:                    | :white_check_mark:                |
| signAndSubmitTransaction | :white_check_mark:          | :white_check_mark:            | :white_check_mark:                    | :white_check_mark:                |
| onAccountChanged         | :white_check_mark:          | :heavy_minus_sign:            | :white_check_mark:                    | :white_check_mark:                |
| onNetworkChanged         | :white_check_mark:          | :heavy_minus_sign:            | :white_check_mark:                    | :white_check_mark:                |
| onChainChanged           | :heavy_minus_sign:          | :heavy_minus_sign:            | :white_check_mark:                    | :white_check_mark:                |
