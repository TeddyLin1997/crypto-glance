import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enUS from '@/assets/locales/en-US.json'
import zhTW from '@/assets/locales/zh-TW.json'

type Translate = keyof typeof resources

export const languageList = [
  { short: '繁中', text: '繁體中文', value: 'zh-TW' },
  { short: 'EN', text: 'English', value: 'en-US' },
]

// i18next resource
const resources = {
  'en-US': { translation: enUS },
  'zh-TW': { translation: zhTW },
}

i18n.use(initReactI18next).init({
  resources,
  // lng: getDefaultLanguage(),
  lng: 'en-US',
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
})

export function getDefaultLanguage () {
  const local = localStorage.getItem('language')
  const browser = resources[navigator.language as Translate] ? navigator.language : 'en-US'
  return local || browser
}
