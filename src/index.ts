import './styles/styles.less'
import m from 'mithril'
import i18n from 'gettext.js'
import App from './components/App'

global.t = i18n()

// Mount the app
m.mount(document.getElementById('app')!, App)
