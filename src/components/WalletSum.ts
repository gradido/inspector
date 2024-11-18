import m from 'mithril'
import { formatCurrency } from '../utils/utils'

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
  
  eyeIcon(visible: boolean) {
    const hiddenEye = [
      m('path', {d: 'M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z'}),
      m('path', {d: 'M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829'}),
      m('path', {d: 'M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12l.708-.708l12 12z'})
    ]
    const visibleEye = [
      m('path', {d: 'M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z'}),
      m('path', {d: 'M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0'})
    ]
    return m('svg.me-3.gradido-global-border-color-accent', {viewBox: '0 0 16 16', width: '1.2em', height: '1.2em'}, 
      m('g', {fill: 'currentColor'}, visible ? visibleEye : hiddenEye)
    )
  }

  view({attrs}: m.CVnode<Attrs>) {
    return m('.col-lg-6.col-12', 
      m(attrs.active ? '.active.router-link-exact-active' : '', 
        {'aria-current': attrs.active ? 'page' : undefined}, m('.translucent-color-opacity', [
          m('.text-center', m('span.badge.position-absolute.mt--2.px-3.zindex1.bg-gradido-gradient', attrs.name)),
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
                m('button.transparent-button', {onclick: () => this.state.show = !this.state.show}, this.eyeIcon(this.state.show))
              )
            ])
          ])
        ])
      )
    )
  }
}