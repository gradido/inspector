import m, { type Child } from 'mithril'
import { combineClasses } from '../../../utils/utils'

interface Attrs {
  info: (isOpen: boolean) => Child //info is a function that maintains the state
  details: Child
  containerClasses?: string[]
  detailClasses?: string[]
  id: string
}

export class Collapse implements m.ClassComponent<Attrs> {
  detailsVisible: boolean
  lastKnownId: string
  constructor() {
    this.detailsVisible = false
    this.lastKnownId = ''
  }

  oninit({ attrs }: m.CVnode<Attrs>) {
    this.detailsVisible = false
    this.lastKnownId = attrs.id
  }
  onupdate({ attrs }: m.CVnode<Attrs>) {
    if (attrs.id !== this.lastKnownId) {
      this.detailsVisible = false
      this.lastKnownId = attrs.id
      m.redraw()
    }
  }

  view({ attrs }: m.CVnode<Attrs>) {
    const detailClasses = attrs.detailClasses ?? []
    detailClasses.push('collapse')
    if (this.detailsVisible) {
      detailClasses.push('show')
    }
    return m(
      combineClasses(attrs.containerClasses ?? []),
      {
        onclick: (e: MouseEvent) => {
          const target = e.target as HTMLElement
          if (target.closest('a') || target.closest('button') || target.classList.contains('btn')) {
            return
          }
          this.detailsVisible = !this.detailsVisible
        },
      },
      [
        attrs.info(this.detailsVisible),
        m(combineClasses(detailClasses), { 'is-nav': false }, attrs.details),
      ],
    )
  }
}
