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
global.groupAlias = 'c00b210fc0a189df054eb9dafb584c527e9aeb537a62a35d44667f54529c73f5'
localStorage.setItem('language', navigator.language)
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

