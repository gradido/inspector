import m from 'mithril'
import ArrowDownCircle from '~icons/bi/arrow-down-circle' 
import ArrowUpCircle from '~icons/bi/arrow-up-circle' 

interface Attrs {
  open: boolean
}

export class CollapseArrow implements m.ClassComponent<Attrs> {
  view({attrs}: m.CVnode<Attrs>) {
    return m('.h1.collapse-arrow', { class: attrs.open ? 'text-black' : 'text-muted' }, 
      attrs.open ? m.trust(ArrowUpCircle) : m.trust(ArrowDownCircle)
    )
  }
}
