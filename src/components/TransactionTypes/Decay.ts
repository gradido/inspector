import m from 'mithril'
import { Droplet } from '../svg/Droplet'
import { CollapseArrow } from '../CollapseArrow'
import { t } from '../../utils/i18n'

interface Attrs {
  isOpen: boolean
}

export class Decay implements m.ClassComponent<Attrs> {
  view({attrs}: m.CVnode<Attrs>) {
    return m('.row.text-color-gdd-yellow.align-items-center', [
      m('.col-1', m(Droplet, {style: {'--31d77598': 'var(--bs-gold)'}, classes: ['icon-variant']})),
      m('.col', t.__('Decay since the last transaction')),
      m('.col-md-1.col-lg-1.col-12.text-end', 
        m('.collapse-icon.text-end', 
          m(CollapseArrow, { open: attrs.isOpen }))
      )
    ])
  }
}
