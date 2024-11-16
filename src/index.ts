import 'bootstrap/scss/bootstrap.scss'
import './styles/styles.less'
import 'bootstrap/js/index.umd.js'
import m from 'mithril'
import i18nInit from './utils/i18nInit'
import Layout from './components/Layout'
import LastTransactions from './pages/LastTransactions'
import Search from './pages/Search'

i18nInit()

var root = document.getElementById('app')!

// m.route.prefix = ''

// routes
m.route(root, '/', {
   '/': {
    render: () => m(Layout, m(LastTransactions))
  },
  '/search': {
    render: () => m(Layout, m(Search))
  }
})

