import { FewchaWalletProvider } from './fewcha'
import { MartianWalletProvider } from './martian'
import { PetraWalletProvider } from './petra'
import { PontemWalletProvider } from './pontem'

declare global {
  var aptos: PetraWalletProvider
  var martian: MartianWalletProvider
  var pontem: PontemWalletProvider
  var fewcha: FewchaWalletProvider
}
