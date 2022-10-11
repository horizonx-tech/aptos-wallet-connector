import {
  connect,
  WalletInterface,
  WalletType,
  SUPPORTED_WALLETS,
  lastConnectedWalletType,
} from '@horizonx/aptos-wallet-connector'
import type { NextPage } from 'next'
import Head from 'next/head'
import {
  MutableRefObject,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'

type TestResults = Partial<
  Record<keyof WalletInterface, { result?: any; success: boolean }>
>
const execAsyncFn = <
  K extends keyof Omit<
    WalletInterface,
    'type' | 'onAccountChanged' | 'onNetworkChanged'
  >,
>(
  wallet: WalletInterface,
  fn: K,
  results: MutableRefObject<TestResults>,
  params: Parameters<WalletInterface[K]> | [] = [],
) => {
  // @ts-ignore
  return wallet[fn](...params).then(
    (result) => {
      console.log(result)
      results.current[fn] = {
        success: true,
        result: JSON.stringify(result, null, 2),
      }
    },
    (e) => {
      console.log(e)
      results.current[fn] = {
        success: false,
        result: JSON.stringify(e, null, 2),
      }
    },
  )
}

const Home: NextPage = () => {
  const [type, setType] = useState<WalletType>()
  const [lastType, setLastType] = useState<WalletType>()
  const [wallet, setWallet] = useState<WalletInterface>()
  const [tested, setTested] = useState<boolean>()
  const [_, forceUpdate] = useReducer((x) => x + 1, 0)

  const results = useRef<
    Partial<Record<keyof WalletInterface, { result?: any; success: boolean }>>
  >({})
  const connectWallet = async (type: WalletType): Promise<WalletInterface> => {
    setTested(false)
    setWallet(undefined)
    setType(type)
    try {
      const res = await connect(type)
      if (!res) throw new Error('Failed to connect wallet.')
      results.current = {
        ...Object.keys(res)
          .filter((key) => key !== 'type')
          .reduce(
            (res, key) => ({
              ...res,
              [key]: { success: false, result: 'Not Executed' },
            }),
            {},
          ),
        connect: { success: true },
      }
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

  const execTests = async (wallet: WalletInterface) => {
    const account = await wallet.account()
    await Promise.all([
      execAsyncFn(wallet, 'isConnected', results),
      execAsyncFn(wallet, 'account', results),
      execAsyncFn(wallet, 'network', results),
      execAsyncFn(wallet, 'chainId', results),
      execAsyncFn(wallet, 'signAndSubmitTransaction', results, [
        {
          function: '0x1::coin::transfer',
          type_arguments: ['0x1::aptos_coin::AptosCoin'],
          arguments: [account, 1],
        },
        { gas_unit_price: '1000' },
      ]),
    ]).catch(() => {})
    await execAsyncFn(wallet, 'disconnect', results).catch(() => {})
    await execAsyncFn(wallet, 'connect', results).catch(() => {})
  }

  // Test Listeners
  useEffect(() => {
    if (!wallet) return
    const removeListeners: VoidFunction[] = []
    if (wallet.onAccountChanged) {
      const removeListener = wallet.onAccountChanged((result) => {
        results.current.onAccountChanged = { success: true, result }
        forceUpdate()
      })
      removeListeners.push(removeListener)
    } else {
      results.current.onAccountChanged = {
        success: false,
        result: 'Not Supported',
      }
    }

    if (wallet.onNetworkChanged) {
      const removeListener = wallet.onNetworkChanged((result) => {
        results.current.onNetworkChanged = {
          success: true,
          result: JSON.stringify(result, null, 2),
        }
        forceUpdate()
      })
      removeListeners.push(removeListener)
    } else {
      results.current.onNetworkChanged = {
        success: false,
        result: 'Not Supported',
      }
    }
    forceUpdate()
    return () => {
      removeListeners.forEach((fn) => fn())
    }
  }, [wallet])
  useEffect(() => {
    setLastType(lastConnectedWalletType())
  }, [])

  return (
    <div>
      <Head>
        <title>Wallet Tester</title>
      </Head>
      <main>
        <h1>Wallet Tester</h1>
        <div>
          {SUPPORTED_WALLETS.map((type) => (
            <button
              key={type}
              onClick={() =>
                connectWallet(type)
                  .then(execTests)
                  .finally(() => setTested(true))
              }
            >
              {type}
            </button>
          ))}
        </div>
        {tested && (
          <div>
            <h2>Result</h2>
            <table>
              <tbody>
                <tr>
                  <td>Wallet</td>
                  <td />
                  <td>{type}</td>
                </tr>
                {Object.entries(results.current).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value.success ? 'OK' : 'NG'}</td>
                    <td>{value.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={async () => {
                if (!wallet) return
                const account = await wallet.account()
                execAsyncFn(wallet, 'signAndSubmitTransaction', results, [
                  {
                    function: '0x1::coin::transfer',
                    type_arguments: ['0x1::aptos_coin::AptosCoin'],
                    arguments: [account, 1],
                  },
                  { gas_unit_price: '1000' },
                ])
              }}
            >
              Retry Transaction
            </button>
          </div>
        )}
        {lastType && (
          <div>
            <h2>Last Connected Wallet Type</h2>
            {lastType}
          </div>
        )}
        <div hidden>{_}</div>
      </main>
    </div>
  )
}

export default Home
