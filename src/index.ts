import 'bootstrap/scss/bootstrap.scss'
import './styles/styles.less'
import './styles/gradido-template.scss'
import 'bootstrap/js/src/toast'
import m from 'mithril'
import i18nInit from './utils/i18nInit'
import { Layout } from './components/Layout'
import { LastTransactions } from './pages/LastTransactions'
import { Account } from './pages/Account'
import { Toaster } from './components/Toaster'

i18nInit()
global.toaster = new Toaster
// TODO: move to config
global.nodeServerUrl = 'http://127.0.0.1:8340/api'
global.groupAlias = '77c8732a4584cb1e099ae0c4bcc3cad9b453895f1449a42d53f82174b0527da6'

var root = document.getElementById('app')!

// m.route.prefix = ''

// routes
m.route(root, '/', {
   '/': {
    render: () => m(Layout, m(LastTransactions))
  },
  '/account/:id': {
    render: ({attrs}) => m(Layout, m(Account, attrs))
  }
})

