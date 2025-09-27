// src/components/Layout.ts
import m from 'mithril'
import { NavBar } from './NavBar'

interface Attrs {
  communityId: string
}

export const Layout: m.Component<Attrs> = {
  view: ({attrs, children}) => {
    return m('#app-wrapper', [
      m(NavBar, {communityId: attrs.communityId}),
      m('#content', children),
      m('.toaster-wrapper', m(toaster))
    ])
  }
}

