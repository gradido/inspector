import m from 'mithril'
import { combineElementWithClasses } from '../../utils/utils'

interface Attrs {
  style?: any
  classes: string[]
}

export class Droplet implements m.ClassComponent<Attrs> {
  view({attrs}: m.CVnode<Attrs>) {
    return m(combineElementWithClasses('svg', attrs.classes), { viewBox: '0 0 16 16', width: '1.2em', height: '1.2em', style: attrs.style},
      m('g', {fill: 'currentColor', 'fill-rule': 'evenodd'}, [
        m('path', {d: 'M7.21.8C7.69.295 8 0 8 0q.164.544.371 1.038c.812 1.946 2.073 3.35 3.197 4.6C12.878 7.096 14 8.345 14 10a6 6 0 0 1-12 0C2 6.668 5.58 2.517 7.21.8m.413 1.021A31 31 0 0 0 5.794 3.99c-.726.95-1.436 2.008-1.96 3.07C3.304 8.133 3 9.138 3 10c0 0 2.5 1.5 5 .5s5-.5 5-.5c0-1.201-.796-2.157-2.181-3.7l-.03-.032C9.75 5.11 8.5 3.72 7.623 1.82z'}),
        m('path', {d: 'M4.553 7.776c.82-1.641 1.717-2.753 2.093-3.13l.708.708c-.29.29-1.128 1.311-1.907 2.87z'})
      ])
    )
  }
}
