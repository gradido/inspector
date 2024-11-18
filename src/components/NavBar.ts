import m from 'mithril'

/*import 'bootstrap/scss/_nav.scss'
import 'bootstrap/scss/_navbar.scss'
*/

import 'bootstrap/js/src/collapse.js'
import { detectSearchType } from '../utils/detectType'
import { SearchType } from '../enum/SearchType'

interface State {
  search: string
}

export class NavBar implements m.ClassComponent<{}> {
  state: State
  constructor() {
    this.state = {
      search: ''
    }
  }
  search(e: any) {
    e.preventDefault()
    const type = detectSearchType(this.state.search)
    switch(type) {
      case SearchType.PUBLIC_KEY_HEX:
        m.route.set('/account', this.state.search)
        break
      default: 
    }
    
    console.log('search: ', this.state)
  }
  view() {
      const isAccount = m.route.get() === '/account'
      const inactiveNavLink = 'a.nav-link'
      const activeNavLink = 'a.nav-link.active'
      return m('.component-navbar.wrapper-nav', 
        m('nav.navbar.bg-light-dark.navbar-expand-lg', {'data-bs-theme': 'dark'}, 
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
                    m(isAccount ? activeNavLink : inactiveNavLink, {
                      href: m.route.prefix + '/account',
                      'aria-current': isAccount ? 'page' : undefined
                    }, t.__('Account')))
                ]),
                m('form.d-flex', { role: 'search', onsubmit: (e: any) => this.search(e) }, [
                  m('input.form-control.me-2', {
                    type: 'search', 
                    placeholder: t.__('Search'), 
                    'aria-label': t.__('Search'),
                    style: { width: '45vw' },
                    oninput: (e: any) => this.state.search = e.target.value
                  }),
                  m('button.btn.btn-outline-light', {type: 'submit'}, t.__('Search'))
                ])
              ])
            ]
          )
        )
      )
  }
}
