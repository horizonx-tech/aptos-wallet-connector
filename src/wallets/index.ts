import { AptosProviderInterface } from '@blocto/sdk'
import { connect as connectAptosWallet } from './aptos'
import { connect as connectBloctoWallet } from './blocto'
import { connect as connectFewchaWallet } from './fewcha'
import { connect as connectMartianWallet } from './martian'
import { connect as connectPontemWallet } from './pontem'
import { WalletInterface } from './types'

export * from './types'

export const SUPPORTED_WALLETS = [
  'aptos',
  'martian',
  'pontem',
  'fewcha',
  'blocto',
] as const

export type WalletType = typeof SUPPORTED_WALLETS[number]

export const isSupportedWalletType = (arg: any): arg is WalletType =>
  SUPPORTED_WALLETS.includes(arg as any)

export type WalletConnector = {
  <T extends Exclude<WalletType, 'blocto'>>(
    type: T,
    provider?: undefined,
  ): Promise<WalletInterface<T> | undefined>
  <T extends 'blocto'>(type: T, provider: AptosProviderInterface): Promise<
    WalletInterface<T> | undefined
  >
}

export const connectWallet: WalletConnector = async (
  type: any,
  provider?: any,
) => {
  switch (type) {
    case 'aptos':
      return connectAptosWallet()
    case 'martian':
      return connectMartianWallet()
    case 'pontem':
      return connectPontemWallet()
    case 'fewcha':
      return connectFewchaWallet()
    case 'blocto':
      return connectBloctoWallet(provider)
  }
}
