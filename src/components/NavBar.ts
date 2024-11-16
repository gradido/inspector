import m from 'mithril'

interface Attrs {
}

interface State {
}

export const NavBar: m.Component<Attrs, State> = {
  oninit: ({attrs, state}) => {
    
  },
  view: ({attrs, state}) => {
      console.log(m.route.get())
      const isSearch = m.route.get() === '/search'
      const inactiveNavLink = 'a.nav-link'
      const activeNavLink = 'a.nav-link.active'
      return m('.component-navbar.wrapper-nav', 
        m('.navbar.bg-light-dark.navbar-expand-lg', {'data-bs-theme': 'dark'}, 
          m('.container-fluid', [
              m('a.navbar-brand.mb-2', {href: m.route.prefix + '/'},
                m('img.navbar-brand-img.ps-2', {src: '/img/gradido_logo_w_s.png'})
              ),
              m('button.navbar-toggler', {
                type: 'button',
                'data-bs-toggle': 'collapse',
                'data-bs-target': '#nav-collapse',
                'aria-label': t.__('Toggle navigation'), 
                'aria-controls': 'nav-collapse',
                'aria-expanded': false
              }, 
                m('span.navbar-toggler-icon')
              ),
              m('#nav-collapse.collapse.navbar-collapse', {'is-nav': true}, [
                m('ul.navbar-nav', [
                  m('li.nav-item', 
                    m(isSearch ? activeNavLink : inactiveNavLink, {
                      href: m.route.prefix + '/search',
                      'aria-current': isSearch ? 'page' : undefined
                    }, t.__('Search')))
                ])
              ])
            ]
          )
        )
      )
  }
}

export default NavBar
