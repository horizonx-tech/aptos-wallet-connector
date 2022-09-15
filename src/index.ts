import { connect as connectAptosWallet } from './wallets/aptos'
import { connect as connectFewchaWallet } from './wallets/fewcha'
import { connect as connectMartianWallet } from './wallets/martian'
import { connect as connectPontemWallet } from './wallets/pontem'
import { WalletInterface } from './wallets/types'

export * from './wallets/types'

export const SUPPORTED_WALLETS = [
  'aptos',
  'martian',
  'pontem',
  'fewcha',
] as const

export type WalletType = typeof SUPPORTED_WALLETS[number]

export const isSupportedWalletType = (arg: any): arg is WalletType =>
  SUPPORTED_WALLETS.includes(arg as any)

export const connect = async (
  type: WalletType,
): Promise<WalletInterface<WalletType> | undefined> => {
  switch (type) {
    case 'aptos':
      return connectAptosWallet()
    case 'martian':
      return connectMartianWallet()
    case 'pontem':
      return connectPontemWallet()
    case 'fewcha':
      return connectFewchaWallet()
  }
}
