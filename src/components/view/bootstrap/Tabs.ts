import m from 'mithril'
import { combineElementWithClasses } from '../../../utils/utils'

interface Attrs {
  itemTitles: string[]
  children: m.ChildArray
}

export class Tabs implements m.ClassComponent<Attrs> {
  activeNavItem: number
  constructor() {
    this.activeNavItem = 0
  }

  view({attrs}: m.CVnode<Attrs>) {
    return m('', [
      m('ul.nav.nav-tabs', attrs.itemTitles.map((navItem, index) => {
        const classes = ['nav-item']
        if(index === this.activeNavItem) {
          classes.push('active')
        }
        return m(
          combineElementWithClasses('li', classes), 
            m('button.nav-link', {
              'aria-current': index === this.activeNavItem ? 'page' : undefined,
              onclick: () => this.activeNavItem = index
            }, navItem)
          )
      })),
      m('.tab-content', [
        m('.tab-pane.show.active', {role: 'tabpanel'}, attrs.children[this.activeNavItem])
      ])
    ])
  }
}
