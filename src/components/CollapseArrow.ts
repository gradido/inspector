import m from 'mithril'
import { ArrowInCircle } from './svg/ArrowInCircle'
import { ArrowType } from '../enum/ArrowType'

interface Attrs {
  open: boolean
}

export class CollapseArrow implements m.ClassComponent<Attrs> {
  view({attrs}: m.CVnode<Attrs>) {
    return m(ArrowInCircle, { 
      type: attrs.open ? ArrowType.UP : ArrowType.DOWN, 
      classes: [attrs.open ? 'text-black' : 'text-muted', 'h1']
    })
  }
}
