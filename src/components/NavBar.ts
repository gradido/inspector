import m from 'mithril'

interface Attrs {
}

interface State {
}

export const NavBar: m.Component<Attrs, State> = {
  oninit: ({attrs, state}) => {
    
  },
  view: ({attrs, state}) => {
      return m('.component-navbar.wrapper-nav', 
        m('.navbar.bg-light-dark.navbar-expand-lg', {'data-bs-theme': 'dark'}, 
          m('.container-fluid', [
              m('a.navbar-brand.mb-2', {href: m.route.prefix + '/'},
                m('img.navbar-brand-img.ps-2', {src: '/img/gradido_logo_w_s.png'})
              ),
              m('#nav-collapse.collapse.navbar-collapse', {'is-nav': true}, [
                m('ul.navbar-nav', [
                  m('li.nav-item', 
                    m('a.nav-link', {href: m.route.prefix + '/search'}, t.__('Search')))
                ])
              ])
            ]
          )
        )
      )
  }
}

export default NavBar
