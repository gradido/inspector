import 'bootstrap/scss/bootstrap.scss'
import './styles/styles.less'
import 'bootstrap/js/src/toast'
import m from 'mithril'
import i18nInit from './utils/i18nInit'
import Layout from './components/Layout'
import LastTransactions from './pages/LastTransactions'
import Account from './pages/Account'
import { Toaster } from './components/Toaster'

i18nInit()
global.toaster = new Toaster

var root = document.getElementById('app')!

// m.route.prefix = ''

// routes
m.route(root, '/', {
   '/': {
    render: () => m(Layout, m(LastTransactions))
  },
  '/account/:id': {
    render: () => m(Layout, m(Account))
  }
})

