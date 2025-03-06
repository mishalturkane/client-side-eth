import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'
import { Account } from './Account'
import { WalletOptions } from './wallet-options'
import './App.css';
import { TotalBalance } from './TotalBalance'
import { AllowUSDT } from './AllowUSDT'
import { AllowUSDC } from './AllowUSDC'
import { AllowWBTC } from './AllowWBTC'
import { AllowSOL } from './AllowSOL'
import { AllowDOGE } from './AllowDOGE'
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
        <h1>Wallet Adaptor</h1>
        <ConnectWallet />
        <TotalBalance/>
        <AllowUSDT/>
        <AllowUSDC/>
        <AllowWBTC/>
        <AllowSOL/>
        <AllowDOGE/>
      </QueryClientProvider> 
    </WagmiProvider>
  )
}

export default App;