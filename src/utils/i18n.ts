import i18n from 'gettext.js'
import deMessages from '../locales/de/messages.json'

function i18nInit() {
  
  const translations = [
    // require('./locales/en/messages.json'),
    {
      messages: deMessages,
      pluralForms: 'nplurals=2; plural=n>1;'
    }
    // require('./locales/fr/messages.json'),
  ];
  const t = i18n()
  
  translations.forEach((j) => {
    j.messages['']['plural-forms'] = j.pluralForms
    t.loadJSON(j.messages, 'messages')
  })
  t.setLocale(localStorage.getItem('language') || 'de')
  return t
}
export const t = i18nInit()
