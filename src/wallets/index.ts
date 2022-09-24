import { connect as connectAptosWallet } from './aptos'
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
] as const

export type WalletType = typeof SUPPORTED_WALLETS[number]

export const isSupportedWalletType = (arg: any): arg is WalletType =>
  SUPPORTED_WALLETS.includes(arg as any)

export const connectWallet = async (
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
