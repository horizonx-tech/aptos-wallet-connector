import {
  getLastConnectedWalletType,
  setLastConnectedWalletType,
} from './utils/localstorage'
import {
  connectWallet,
  isSupportedWalletType,
  SUPPORTED_WALLETS,
  WalletConnector,
  WalletInterface,
  WalletType,
} from './wallets'

export { ERRORS } from './utils/errors'
export { SUPPORTED_WALLETS, isSupportedWalletType, WalletType, WalletInterface }

export const connect: WalletConnector = async (type: any, provider?: any) => {
  const wallet = await connectWallet(type, provider)
  if (wallet) setLastConnectedWalletType(type)
  return wallet
}

export const lastConnectedWalletType = (): WalletType | undefined => {
  const type = getLastConnectedWalletType()
  if (!isSupportedWalletType(type)) return
  return type
}
