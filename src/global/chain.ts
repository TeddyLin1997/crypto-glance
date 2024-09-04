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
    }
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
    }
  },
}

export const CHAIN_INFO_LIST = [
  CHAIN_INFO[Chain.ETH],
  CHAIN_INFO[Chain.Sepolia],
]
