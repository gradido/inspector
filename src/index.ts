import './styles/styles.less'
import m from 'mithril'
import App from './components/App'
import i18nInit from './utils/i18nInit'

i18nInit()

// Mount the app
m.mount(document.getElementById('app')!, App)
