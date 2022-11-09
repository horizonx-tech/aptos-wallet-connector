import BloctoSDK from '@blocto/sdk'
import {
  connect,
  lastConnectedWalletType,
  WalletInterface,
  WalletType,
} from '@horizonx/aptos-wallet-connector'
import { useEffect, useReducer, useRef, useState } from 'react'
import { BLOCTO_APP_ID } from '../constants'
import { getSnapshot, toSnapshot } from '../snapshots'

type TestCase = keyof WalletInterface | 'snapshot'
export type TestResults = Partial<
  Record<TestCase, { result?: any; success: boolean }>
>

const connectWalletWithProvider = async (
  type: WalletType,
): Promise<WalletInterface | undefined> => {
  if (type === 'blocto') {
    const provider = new BloctoSDK({
      appId: BLOCTO_APP_ID,
      aptos: { chainId: 2 },
    }).aptos!
    return connect(type, provider)
  }
  return connect(type)
}

export const useTests = () => {
  const [type, setType] = useState<WalletType>()
  const [lastType, setLastType] = useState<WalletType>()
  const [wallet, setWallet] = useState<WalletInterface>()
  const [_, forceUpdate] = useReducer((x) => x + 1, 0)

  const results = useRef<TestResults>({})

  const connectWallet = async (type: WalletType): Promise<WalletInterface> => {
    setWallet(undefined)
    setType(type)
    try {
      const res = await connectWalletWithProvider(type)
      if (!res) throw new Error('Failed to connect wallet.')
      results.current = initialize(res)
      setWallet(res)
      setLastType(lastConnectedWalletType())
      return res
    } catch (e) {
      results.current = {
        connect: { success: false, result: JSON.stringify(e, null, 2) },
      }
      return Promise.reject()
    }
  }

  const execTests = async (type: WalletType) => {
    const wallet = await connectWallet(type)
    return testFunctions(wallet, results.current).finally(forceUpdate)
  }
  const execTransaction = async () => {
    if (!wallet) return
    await testTransaction(wallet, results.current)
    forceUpdate()
  }

  useEffect(() => {
    if (!wallet) return
    const removeListeners = testListeners(wallet, results.current, forceUpdate)
    testSnapshot(wallet, results.current)
    forceUpdate()
    return () => {
      removeListeners.forEach((fn) => fn())
    }
  }, [wallet])

  useEffect(() => {
    setLastType(lastConnectedWalletType())
  }, [])

  return {
    type,
    lastType,
    results,
    wallet,
    execTests,
    execTransaction,
  }
}

export const testFunctions = async (
  wallet: WalletInterface,
  results: TestResults,
) => {
  const account = await wallet.account()
  await Promise.all([
    execAsyncFnTest(wallet, 'isConnected', results),
    execAsyncFnTest(wallet, 'account', results),
    execAsyncFnTest(wallet, 'network', results),
    execAsyncFnTest(wallet, 'chainId', results),
    execAsyncFnTest(wallet, 'signAndSubmitTransaction', results, [
      {
        function: '0x1::coin::transfer',
        type_arguments: ['0x1::aptos_coin::AptosCoin'],
        arguments: [account?.address, 1],
      },
      { gas_unit_price: '1000' },
    ]),
  ]).catch(() => {})
  await execAsyncFnTest(wallet, 'disconnect', results).catch(() => {})
  await execAsyncFnTest(wallet, 'connect', results).catch(() => {})
}

export const testListeners = (
  wallet: WalletInterface,
  results: TestResults,
  forceUpdate: VoidFunction,
) => {
  const removeListeners: VoidFunction[] = []
  if (wallet.onAccountChanged) {
    const removeListener = wallet.onAccountChanged((result) => {
      results.onAccountChanged = {
        success: true,
        result: JSON.stringify(result, null, 2),
      }
      forceUpdate()
    })
    removeListeners.push(removeListener)
  } else {
    results.onAccountChanged = {
      success: false,
      result: 'Not Supported',
    }
  }

  if (wallet.onNetworkChanged) {
    const removeListener = wallet.onNetworkChanged((result) => {
      results.onNetworkChanged = {
        success: true,
        result: JSON.stringify(result, null, 2),
      }
      forceUpdate()
    })
    removeListeners.push(removeListener)
  } else {
    results.onNetworkChanged = {
      success: false,
      result: 'Not Supported',
    }
  }
  return removeListeners
}

export const testSnapshot = async (
  wallet: WalletInterface,
  results: TestResults,
) => {
  const snapshot = getSnapshot(wallet.type)
  if (snapshot) {
    const matched = snapshot === toSnapshot(wallet.type)
    results.snapshot = {
      success: matched,
      result: matched ? 'Snapshot Matched' : 'Snapshot NOT Matched',
    }
  } else {
    results.snapshot = {
      success: false,
      result: 'Snapshot NOT Found',
    }
  }
}

export const testTransaction = async (
  wallet: WalletInterface,
  results: TestResults,
) => {
  const account = await wallet.account()
  await execAsyncFnTest(wallet, 'signAndSubmitTransaction', results, [
    {
      function: '0x1::coin::transfer',
      type_arguments: ['0x1::aptos_coin::AptosCoin'],
      arguments: [account, 1],
    },
    { gas_unit_price: '1000' },
  ])
}

export const initialize = (wallet: WalletInterface) => ({
  ...Object.keys(wallet)
    .filter((key) => key !== 'type')
    .reduce(
      (res, key) => ({
        ...res,
        [key]: { success: false, result: 'Not Executed' },
      }),
      {},
    ),
  connect: { success: true },
})

const execAsyncFnTest = <
  K extends keyof Omit<
    WalletInterface,
    'type' | 'onAccountChanged' | 'onNetworkChanged'
  >,
>(
  wallet: WalletInterface,
  fn: K,
  results: TestResults,
  params: Parameters<WalletInterface[K]> | [] = [],
) => {
  // @ts-ignore
  return wallet[fn](...params).then(
    (result) => {
      results[fn] = {
        success: true,
        result: JSON.stringify(result, null, 2),
      }
    },
    (e) => {
      console.log(e)
      results[fn] = {
        success: false,
        result: JSON.stringify(e, null, 2),
      }
    },
  )
}
