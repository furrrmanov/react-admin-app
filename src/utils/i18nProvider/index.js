import polyglotI18nProvider from 'ra-i18n-polyglot'
import enMessages from '@/i18n/en'
import ruMessages from '@/i18n/ru'

export const i18nProvider = polyglotI18nProvider(
  (locale) => (locale === 'ru' ? ruMessages : enMessages),
  'en'
)

