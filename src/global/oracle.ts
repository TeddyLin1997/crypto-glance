export const AAVE_PRICE_ORACLE_ADDRESS = '0x2da88497588bf89281816106C7259e31AF45a663' // ethereum
// export const AAVE_PRICE_ORACLE_ADDRESS = '0xA50ba011c48153De246E5192C8f9258A2ba79Ca9' // sepolia

export const AAVE_PRICE_ORACLE_ABI = [
  'function getAssetPrice(address asset) view returns (uint256)'
]

export const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function decimals() view returns (uint8)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function transfer(address to, uint amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint amount)',
]
