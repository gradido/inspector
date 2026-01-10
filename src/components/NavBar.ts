import m from 'mithril'

import 'bootstrap/js/src/collapse.js'
import { SearchType } from '../enum/SearchType'
import { detectSearchType } from '../utils/detectType'

interface Attrs {
  communityId: string
}

export class NavBar implements m.ClassComponent<Attrs> {
  searchString: string = ''
  searchError: string | undefined = undefined
  validated: boolean = false

  search(e: Event, attrs: Attrs) {
    e.preventDefault()
    const type = detectSearchType(this.searchString)
    switch (type) {
      case SearchType.PUBLIC_KEY_HEX:
        m.route.set(`/account/${attrs.communityId}/${this.searchString}`)
        break
      case SearchType.TRANSACTION_NR:
      case SearchType.HIERO_TRANSACTION_ID:
        m.route.set(`/transaction/${attrs.communityId}/${this.searchString}`)
        break
      default:
        this.searchError = t.__('invalid input')
    }
    this.validated = true
    console.log('search: ', this)
  }
  view({ attrs }: m.CVnode<Attrs>) {
    const searchValid = this.searchError === undefined
    return m(
      '.component-navbar.wrapper-nav',
      m(
        'nav.navbar.bg-light-dark.navbar-expand-lg',
        { 'data-bs-theme': 'dark' },
        m('.container-fluid', [
          m(
            'a.navbar-brand.mb-2',
            { href: `${m.route.prefix}/${attrs.communityId}` },
            m('img.navbar-brand-img.ps-2', {
              src: new URL('/img/gradido_logo_w_s.png', import.meta.url).href,
            }),
          ),
          m(
            'button.navbar-toggler',
            {
              type: 'button',
              'data-bs-toggle': 'collapse',
              'data-bs-target': '#nav-collapse',
              'aria-label': t.__('Toggle navigation'),
              'aria-controls': 'nav-collapse',
              'aria-expanded': false,
            },
            m('span.navbar-toggler-icon'),
          ),
          m('#nav-collapse.collapse.navbar-collapse', { 'is-nav': true }, [
            m(
              `form.d-flex${this.validated ? '.was-validated' : ''}`,
              { role: 'search', onsubmit: (e: Event) => this.search(e, attrs) },
              [
                m('.input-group', [
                  m(`input.form-control.me-2.${searchValid ? 'is_valid' : 'is-invalid'}`, {
                    type: 'search',
                    placeholder: t.__('Search'),
                    'aria-label': t.__('Search'),
                    style: { width: '45vw' },
                    oninput: (e: Event) => {
                      this.searchString = (e.target as HTMLInputElement).value
                    },
                  }),
                  this.searchError ? m('.invalid-feedback.show', this.searchError) : undefined,
                ]),
                m('button.btn.btn-outline-light', { type: 'submit' }, t.__('Search')),
              ],
            ),
          ]),
        ]),
      ),
    )
  }
}
