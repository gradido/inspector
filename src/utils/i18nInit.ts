import i18n from 'gettext.js'

global.t = i18n()

function i18nInit() {
  const translations = [
    // require('./locales/en/messages.json'),
    {
      messages: require('../locales/de/messages.json'),
      pluralForms: 'nplurals=2; plural=n>1;'
    }
    // require('./locales/fr/messages.json'),
  ];
  
  translations.forEach((j) => {
    j.messages['']['plural-forms'] = j.pluralForms
    t.loadJSON(j.messages, 'messages')
  })
}



export default i18nInit