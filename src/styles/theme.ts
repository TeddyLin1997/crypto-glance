import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      light: '#ffcf39',
      main: '#FFC408',
      dark: '#b28905',
      contrastText: '#121214',
    },
    secondary: {
      light: '#14bdbd',
      main: '#306F7D',
      dark: '#214d57',
      contrastText: '#fff',
    },
    success: {
      main: '#0ecb81',
      light: '#D0F2F2',
    },
    error: {
      main: '#FF6E6E',
      light: '#FFE2E2',
    }
  },
  typography: {
    fontFamily: '"Kanit", "Noto Sans TC", robot, Inter, system-ui, sans-serif',
  },
})
