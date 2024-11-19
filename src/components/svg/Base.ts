import m from 'mithril'
import { combineElementWithClasses } from '../../utils/utils'

interface Attrs {
  style?: any
  classes: string[]
  paths: string[]
  options?: any
}

export class Base implements m.ClassComponent<Attrs> {
  view({attrs}: m.CVnode<Attrs>) {
    return m(
      combineElementWithClasses('svg', attrs.classes),
      { viewBox: '0 0 16 16', width: '1.2em', height: '1.2em', style: attrs.style},
      m('g', attrs.options ?? {fill: 'currentColor'}, attrs.paths.map((path) => m('path', { d: path })))
    )
  }
}
