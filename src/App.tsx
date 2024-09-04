import Router from '@/routes'
import { ThemeProvider } from '@mui/material/styles'
import WalletContainer from '@/context/wallet-context'
import { theme } from './styles/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <WalletContainer.Provider>
        <Router />
      </WalletContainer.Provider>
    </ThemeProvider>
  )
}

export default App
