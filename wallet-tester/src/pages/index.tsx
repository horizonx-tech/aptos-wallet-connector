import { SUPPORTED_WALLETS } from '@horizonx/aptos-wallet-connector'
import type { NextPage } from 'next'
import Head from 'next/head'
import { toSnapshot } from '../snapshots'
import { useTests } from '../tests'

const Home: NextPage = () => {
  const { type, lastType, results, wallet, execTests, execTransaction } =
    useTests()
  return (
    <div>
      <Head>
        <title>Wallet Tester</title>
      </Head>
      <main>
        <h1>Wallet Tester</h1>
        {lastType && (
          <div>
            <h2>Last Connected Wallet Type</h2>
            {lastType}
          </div>
        )}
        <div>
          <h2>Connect</h2>
          {SUPPORTED_WALLETS.map((type) => (
            <button key={type} onClick={() => execTests(type)}>
              {type}
            </button>
          ))}
        </div>
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
          <button onClick={execTransaction}>Retry Transaction</button>
        </div>
        {wallet && (
          <div>
            <h2>Interface</h2>
            <button
              onClick={() => {
                const str = toSnapshot(wallet.type)
                if (str) window.navigator.clipboard.writeText(str)
              }}
            >
              Copy
            </button>
            <div style={{ padding: 16, background: 'gray', color: 'wheat' }}>
              <code style={{ whiteSpace: 'pre-wrap' }}>
                {toSnapshot(wallet.type)}
              </code>
            </div>
          </div>
        )}
        {/* <div hidden>{_}</div> */}
      </main>
    </div>
  )
}

export default Home
