import { ethers } from 'ethers'
import { createContainer } from 'unstated-next'

const provider = new ethers.JsonRpcProvider('')

const useProvider = () => {
  return { provider }
}


const ProviderContainer = createContainer(useProvider)

export default ProviderContainer
