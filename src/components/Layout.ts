// src/components/Layout.ts
import m from 'mithril'
import { NavBar } from './NavBar'

const Layout: m.Component = {
  view: ({children}) => {
    return m('#app-wrapper', [
      m(NavBar),
      m('#content', children),
      m('.toaster-wrapper', toaster)
    ])
  }
}

export default Layout
