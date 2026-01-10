import i18n from 'gettext.js'

export async function i18nInitAsync() {
  const locale = localStorage.getItem('language') || 'de'
  const t = i18n()
  const base = import.meta.env.BASE_URL
  const messagesResponse = await fetch(`${base}/locales/${locale}/messages.json`)
  const messageJson = await messagesResponse.json()
  t.loadJSON(
    {
      '': { 'plural-forms': 'nplurals=2; plural=n>1', language: locale },
      ...messageJson,
    },
    'messages',
  )
  t.setLocale(locale)
  return t
}
