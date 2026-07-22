import type { LocaleCode, L10n } from '~/data/site'
import { t } from '~/data/site'

const siteLocale = ref<LocaleCode>('zh')
const initialized = ref(false)

export const useSiteLocale = () => {
  const locale = siteLocale

  const pick = (value: L10n) => t(value, locale.value)

  const setLocale = (value: LocaleCode) => {
    locale.value = value
    if (import.meta.client) {
      localStorage.setItem('site-locale', value)
      document.documentElement.lang = value === 'zh' ? 'zh-CN' : 'en'
    }
  }

  const toggleLocale = () => {
    setLocale(locale.value === 'zh' ? 'en' : 'zh')
  }

  onMounted(() => {
    if (initialized.value) return
    initialized.value = true
    const saved = localStorage.getItem('site-locale')
    if (saved === 'zh' || saved === 'en') siteLocale.value = saved
    document.documentElement.lang = siteLocale.value === 'zh' ? 'zh-CN' : 'en'
  })

  return { locale, pick, setLocale, toggleLocale }
}
