import m, { Child } from 'mithril'
import { combineClasses, combineElementWithClasses } from '../../utils/utils'

interface Attrs {
  info: (isOpen: boolean) => Child //info is a function that maintains the state
  details: Child
  containerClasses: string[]
  detailClasses: string[]
}

interface State {
  detailsVisible: boolean
}

export class Collapse implements m.ClassComponent<Attrs> {
  state: State 
  constructor() {
    this.state = { detailsVisible: false}
  }

  view({attrs}: m.CVnode<Attrs>) {
    const detailClasses = attrs.detailClasses
    detailClasses.push('collapse')
    if (this.state.detailsVisible) {
      detailClasses.push('show')
    }
    return m(combineClasses(attrs.containerClasses), 
      {onclick: () => this.state.detailsVisible = !this.state.detailsVisible }, [
        attrs.info(this.state.detailsVisible), 
        m(
          combineClasses(detailClasses),
           {'is-nav': false},
           attrs.details
        )        
      ])    
  }
}
