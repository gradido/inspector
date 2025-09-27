import m from 'mithril'
import { t } from '../utils/i18n'

/*import 'bootstrap/scss/_nav.scss'
import 'bootstrap/scss/_navbar.scss'
*/

import 'bootstrap/js/src/collapse.js'
import { detectSearchType } from '../utils/detectType'
import { SearchType } from '../enum/SearchType'

interface Attrs {
  communityId: string
}

export class NavBar implements m.ClassComponent<Attrs> {
  searchString: string = ''
  searchError: string | undefined = undefined
  validated: boolean = false  

  search(e: any, attrs: Attrs) {
    e.preventDefault()
    const type = detectSearchType(this.searchString)
    switch(type) {
      case SearchType.PUBLIC_KEY_HEX:
        m.route.set(`/account/${attrs.communityId}/${this.searchString}`)
        break
      case SearchType.TRANSACTION_NR:
      case SearchType.HIERO_TRANSACTION_ID:
        console.log(`new route: /transaction/${attrs.communityId}/${this.searchString}`)
        m.route.set(`/transaction/${attrs.communityId}/${this.searchString}`)
        break
      default: 
        this.searchError = t.__('invalid input')
    }
    this.validated = true
    console.log('search: ', this)
  }
  view({attrs}: m.CVnode<Attrs>) {
    const isAccount = m.route.get().search(/.*account.*/) === 0
    const inactiveNavLink = 'a.nav-link'
    const activeNavLink = 'a.nav-link.active'
    const searchValid = this.searchError === undefined
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
              m(`form.d-flex${this.validated ? '.was-validated' : ''}`, { role: 'search', onsubmit: (e: any) => this.search(e, attrs) }, [
                m('.input-group', [
                  m(`input.form-control.me-2.${searchValid ? 'is_valid' : 'is-invalid' }`, {
                    type: 'search', 
                    placeholder: t.__('Search'), 
                    'aria-label': t.__('Search'),
                    style: { width: '45vw' },
                    oninput: (e: any) => this.searchString = e.target.value
                  }),
                  this.searchError ? m('.invalid-feedback.show', this.searchError) : undefined,
                ]),
                m('button.btn.btn-outline-light', {type: 'submit'}, t.__('Search'))
              ])
            ])
          ]
        )
      )
    )
  }
}
