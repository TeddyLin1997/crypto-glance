import Router from '@/routes'
import { ThemeProvider } from '@mui/material/styles'
import ProviderContainer from '@/context/provider-context'
import { theme } from './styles/theme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ProviderContainer.Provider>
        <Router />
      </ProviderContainer.Provider>
    </ThemeProvider>
  )
}

export default App
