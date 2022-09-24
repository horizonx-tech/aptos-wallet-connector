import { WalletType } from '../wallets'

type LocalStorageKey = 'last-connected-wallet-type'

const prefix = 'aptos-wallet-connector#'

const toKey = (key: LocalStorageKey) => `${prefix}${key}`
const get = (key: LocalStorageKey) => localStorage.getItem(toKey(key))
const set = (key: LocalStorageKey, item: string) =>
  localStorage.setItem(toKey(key), item)

export const getLastConnectedWalletType = () =>
  get('last-connected-wallet-type')

export const setLastConnectedWalletType = (type: WalletType) =>
  set('last-connected-wallet-type', type)
