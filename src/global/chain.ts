import ethereum from '@/assets/ethereum.png'

export enum Chain {
  ETH = 1,
  Sepolia = 11155111,
}

type ChainInfo = {
  icon: string
  id: Chain
  name: string
  rpc: string
  explorer: string
  coin: {
    name: string
    icon: string
  }
  nativeTokenAddress?: string
}

export const CHAIN_INFO: { [props: number]: ChainInfo } = {
  [Chain.ETH]: {
    icon: ethereum,
    id: Chain.ETH,
    name: 'Ethereum',
    rpc: 'https://eth.llamarpc.com	',
    explorer: 'https://etherscan.io',
    coin: {
      name: 'ETH',
      icon: ethereum,
    },
    nativeTokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
  },
  [Chain.Sepolia]: {
    icon: ethereum,
    id: Chain.Sepolia,
    name: 'Sepolia',
    // rpc: 'https://ethereum-sepolia-rpc.publicnode.com',
    rpc: 'https://ethereum-sepolia-rpc.publicnode.com',
    explorer: 'https://sepolia.etherscan.io',
    coin: {
      name: 'SepoliaETH',
      icon: ethereum,
    },
    nativeTokenAddress: '0xC558DBdd856501FCd9aaF1E62eae57A9F0629a3c',
  },
}

export const CHAIN_INFO_LIST = [
  CHAIN_INFO[Chain.ETH],
  CHAIN_INFO[Chain.Sepolia],
]
