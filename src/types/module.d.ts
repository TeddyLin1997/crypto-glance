import { EthereumProvider } from 'ethers/providers'
declare module 'react/jsx-runtime' {
  export default any
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
