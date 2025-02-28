import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'
import { Account } from './Account'
import { WalletOptions } from './wallet-options'
import './App.css';
import { TotalBalance } from './TotalBalance'
import { AllowUSDT } from './AllowUSDT'
import { SendETH } from './NativeEth'
const queryClient = new QueryClient()

function ConnectWallet() {
  const { isConnected } = useAccount()
  if (isConnected) return <Account />
  return <WalletOptions />
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <ConnectWallet />
        <TotalBalance/>
        <AllowUSDT/>
        <SendETH/>
      </QueryClientProvider> 
    </WagmiProvider>
  )
}

export default App;