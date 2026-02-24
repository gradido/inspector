// import 'bootstrap/scss/bootstrap.scss'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/styles.scss'
import './styles/gradido.scss'
import 'bootstrap/js/src/toast'
import m from 'mithril'
// import i18nInit from './utils/i18nInit'
import { Layout } from './components/Layout'
import { Toaster } from './components/Toaster'
import { Account } from './pages/Account'
import { LastTransactions } from './pages/LastTransactions'
import { Transaction } from './pages/Transaction'
import { i18nInitAsync } from './utils/i18n'

// i18nInit()
globalThis.toaster = new Toaster()
// TODO: move to config
const langueStringParts = navigator.language.split('-')
localStorage.setItem('language', langueStringParts[0])
const root = document.getElementById('app')
if (!root) {
  throw new Error('app element not found')
}

// m.route.prefix = ''
i18nInitAsync().then((t) => {
  globalThis.t = t
  // routes
  m.route(root, '/', {
    '/': {
      render: () => m(Layout, m(LastTransactions)),
    },
    '/:communityId': {
      render: ({ attrs }) => m(Layout, attrs, m(LastTransactions, attrs)),
    },
    '/account/:communityId/:pubkey': {
      render: ({ attrs }) => m(Layout, attrs, m(Account, attrs)),
    },
    '/transaction/:communityId/:search': {
      render: ({ attrs }) => m(Layout, attrs, m(Transaction, attrs)),
    },
  })
})
