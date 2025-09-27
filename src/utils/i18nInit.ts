import i18n from 'gettext.js'
import deMessages from '../locales/de/messages.json'

globalThis.t = i18n()

function i18nInit() {
  const translations = [
    // require('./locales/en/messages.json'),
    {
      messages: deMessages,
      pluralForms: 'nplurals=2; plural=n>1;'
    }
    // require('./locales/fr/messages.json'),
  ];
  
  translations.forEach((j) => {
    j.messages['']['plural-forms'] = j.pluralForms
    globalThis.t.loadJSON(j.messages, 'messages')
  })
}

export default i18nInit