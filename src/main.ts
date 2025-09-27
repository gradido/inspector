import 'bootstrap/scss/bootstrap.scss'
import './styles/styles.less'
import './styles/gradido-template.scss'
import 'bootstrap/js/src/toast'
import m from 'mithril'
// import i18nInit from './utils/i18nInit'
import { Layout } from './components/Layout'
import { LastTransactions } from './pages/LastTransactions'
import { Account } from './pages/Account'
import { Transaction } from './pages/Transaction'
import { Toaster } from './components/Toaster'

// i18nInit()
globalThis.toaster = new Toaster()
// TODO: move to config
localStorage.setItem('language', navigator.language)
const root = document.getElementById('app')!

// m.route.prefix = ''

// routes
m.route(root, '/', {
  '/': {
    render: () => m(Layout, m(LastTransactions))
   },
   '/:communityId': {
    render: ({attrs}) => m(Layout, attrs, m(LastTransactions, attrs))
  },
  '/account/:communityId/:pubkey': {
    render: ({attrs}) => m(Layout, attrs, m(Account, attrs))
  },
  '/transaction/:communityId/:search': {
    render: ({attrs}) => m(Layout, attrs, m(Transaction, attrs))
  }
})

