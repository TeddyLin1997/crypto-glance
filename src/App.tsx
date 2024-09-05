import Router from '@/routes'
import { ThemeProvider } from '@mui/material/styles'
import WalletContainer from '@/context/wallet-context'
import TokenPriceContext from '@/context/token-price-context'
import { theme } from './styles/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <WalletContainer.Provider>
        <TokenPriceContext.Provider>
          <Router />
        </TokenPriceContext.Provider>
      </WalletContainer.Provider>
    </ThemeProvider>
  )
}

export default App
