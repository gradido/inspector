import m from 'mithril'
import { ArrowType } from '../../enum/ArrowType'
import { combineElementWithClasses } from '../../utils/utils'

interface Attrs {
  type: ArrowType,
  classes: string[]
}

export class ArrowInCircle implements m.ClassComponent<Attrs> {
  pickPath(type: ArrowType) {
    const begin = 'M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0'
    switch(type) {
      case ArrowType.DOWN: 
        return begin + 'M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z'
      case ArrowType.UP: 
        return begin + 'm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z'
    }
  }
  view({attrs}: m.CVnode<Attrs>) {    
    return m(combineElementWithClasses('svg', attrs.classes), { viewBox: '0 0 16 16', width: '1.2em', height: '1.2em'},
      m('g', {fill: 'currentColor', 'fill-rule': 'evenodd'}, m('path', {d: this.pickPath(attrs.type)}))
    )
  }
}
