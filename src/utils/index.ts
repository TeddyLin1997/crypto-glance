import dayjs from 'dayjs'
import { ethers } from 'ethers'
import Big from 'big.js'
import toast from 'react-hot-toast'

export const getChangeColor = (changeValue: number) => {
  return changeValue >= 0 ? '#0ecb81' : '#FF6E6E'
}

export const formatNumber = (input: string | number, fixed?: number) => {
  const num = Big(input === '-' || !input ? 0 : input).toFixed(fixed)
  return formatAmount(num, fixed || 4)
}

export const formatAmount = (input: string | number, fixed?: number) => {
  const value = String(input)
  const integer = value.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  const decimal = value.split('.')[1]?.slice(0, fixed || 4) || ''
  return value.includes('.') ? `${integer}.${decimal}` : `${integer}${decimal}`
}


export function isDevelopmentMode() {
  return process.env.NODE_ENV === 'development'
}

export function timeFormat(time: any = '', format = 'YYYY/MM/DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function isValidEVMAddress (address: string) {
  return ethers.isAddress(address)
}

export function checksumAddress (address: string) {
  return isValidEVMAddress(address) ? ethers.getAddress(address) : address
}

export function truncateSlice(hash: string) {
  return `${hash.slice(0, 10)}.....${hash.slice(-10)}`
}

export const sleep = (seconds: number) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), seconds * 1000)
  })
}

export const timeCountdown = (timestamp: number) => {
  // 目標時間
  const targetTime = dayjs(timestamp)

  // 現在時間
  const currentTime = dayjs()

  // 計算剩餘時間
  const diff = targetTime.diff(currentTime)

  // 轉換為天、小時、分鐘和秒
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds }
}

export const getRandomInteger = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min

export const copy = (text: string) => {
  navigator.clipboard.writeText(text)
    .then(() => toast.success(`Copied: ${text}`))
}

// 底線 -> 小駝峰
export const toCamel = <T>(data: T): T => {
  if (typeof data != 'object' || !data) return data
  if (Array.isArray(data))
    return data.map(item => toCamel<T>(item)) as typeof data

  const newData: any = {}
  for (const key in data) {
    const newKey = key.replace(/_([0-9a-z])/g, (_, m) =>
      (m as string).toUpperCase(),
    )
    newData[newKey] = toCamel(data[key])
  }
  return newData as T
}
