import m from 'mithril'
import { combineElementWithClasses, formatCurrency, stringToBoolean } from '../utils/utils'
import { Eye } from './svg/Eye'

interface Attrs {
  amount: string
  name: string
  active: boolean
}

interface State {
  show: boolean
}

export class WalletSum implements m.ClassComponent<Attrs> {
  state: State
  constructor() {
    this.state = { show: false }
  }
  oninit({attrs}: m.CVnode<Attrs>) {
    const stored = localStorage.getItem(this.getStoreName(attrs.name))
    if(stored) {
      this.state.show = stringToBoolean(stored)
    } 
  }

  getStoreName(name: string): string {
    return 'WalletSum-' + name
  }

  toggleVisibility(attrs: Attrs) {
    this.state.show = !this.state.show
    localStorage.setItem(this.getStoreName(attrs.name), this.state.show.toString())
  }
  
  view({attrs}: m.CVnode<Attrs>) {
    const badgeClasses = ['badge', 'position-absolute', 'mt--2', 'px-3', 'zindex1']
    if (attrs.active) {
      badgeClasses.push('bg-gradido-gradient')
    } else {
      badgeClasses.push('text-bg-light')
    }
    return m('.col-lg-6.col-12', 
      m(attrs.active ? '.active.router-link-exact-active' : '', 
        {'aria-current': attrs.active ? 'page' : undefined}, m('.translucent-color-opacity', [
          m('.text-center', m(combineElementWithClasses('span', badgeClasses), attrs.name)),
          m('.bg-white.app-box-shadow.gradido-border-radius.p-4.gradido-global-border-color-accent', 
            {style: attrs.active ? {border: '1px solid'} : undefined }, [
            m('.row', m('.col.h4', m.trust(attrs.name + '&nbsp;' + t.__('Account')))),
            m('.row', [
              m('.col-9', {style: {height: '26px'}}, [
                m('svg.me-3.gradido-global-border-color-accent.gradido-global-color-accent.d-none.d-lg-inline', {viewBox: '0 0 16 16', width: '1.2em', height: '1.2em'},
                  m('path', {
                    fill: 'currentColor', 
                    d:'M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8L.264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882zm3.515 7.008L14.438 10L8 13.433L1.562 10L4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0zM8 9.433L1.562 6L8 2.567L14.438 6z'
                  })
                ),
                m('span.fw-bold.gradido-global-color-accent', this.state.show ? formatCurrency(attrs.amount, attrs.name) : '****')
              ]),
              m('.col-3.border-start.border-dark',
                m('button.transparent-button', {onclick: () => this.toggleVisibility(attrs)}, 
                  m(Eye, {visible: this.state.show, classes: [
                    'me-3', 
                    'gradido-global-border-color-accent',
                    'pointer',
                    'hover-icon'
                  ] }))
              )
            ])
          ])
        ])
      )
    )
  }
}