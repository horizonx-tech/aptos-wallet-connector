import { WalletType } from '@horizonx/aptos-wallet-connector'
import { APTOS_SNAPSHOT } from './aptos'
import { FEWCHA_SNAPSHOT } from './fewcha'
import { MARTIAN_SNAPSHOT } from './martian'
import { PONTEM_SNAPSHOT } from './pontem'
import { WalletSnapshot } from './types'

export const toSnapshot = (type: string) => {
  // @ts-ignore
  const wallet = window[type]
  if (!wallet) return
  const prototypeObj = Object.getPrototypeOf(wallet)
  const prototype = Object.getOwnPropertyNames(prototypeObj).reduce(
    (res, name) => ({
      ...res,
      [name]: toString(name, prototypeObj[name]),
    }),
    {},
  )
  return JSON.stringify({ ...wallet, prototype }, toString, 2)
}
export const getSnapshot = (type: string) =>
  SNAPSHOTS[type as WalletType]?.snapshot

const SNAPSHOTS: Partial<Record<WalletType, WalletSnapshot>> = {
  aptos: APTOS_SNAPSHOT,
  martian: MARTIAN_SNAPSHOT,
  pontem: PONTEM_SNAPSHOT,
  fewcha: FEWCHA_SNAPSHOT,
}

const toString = (_key: string, value: any) => {
  if (_key.startsWith('_')) return undefined
  if (typeof value !== 'object') return typeof value
  return value
}
