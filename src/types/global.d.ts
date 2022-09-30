import { FewchaWalletProvider } from './fewcha'
import { MartianWalletProvider } from './martian'
import { PetraWalletProvider } from './petra'
import { PontemWalletProvider } from './pontem'

declare global {
  var aptos: PetraWalletProvider | undefined
  var martian: MartianWalletProvider | undefined
  var pontem: PontemWalletProvider | undefined
  var fewcha: FewchaWalletProvider | undefined
}
