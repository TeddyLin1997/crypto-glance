import Router from '@/routes'
import { ThemeProvider } from '@mui/material/styles'
import WalletContainer from '@/context/wallet-context'
import TokenPriceContext from '@/context/token-price-context'
import { theme } from './styles/theme'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <WalletContainer.Provider>
        <TokenPriceContext.Provider>
          <Router />
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </TokenPriceContext.Provider>
      </WalletContainer.Provider>
    </ThemeProvider>
  )
}

export default App
