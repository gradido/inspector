import m, { Child } from 'mithril'
import { Collapse as BCollapse } from 'bootstrap'
import { combineElementWithClasses } from '../../utils/utils'

interface Attrs {
  info: (isOpen: boolean) => Child //info is a function that maintains the state
  details: Child
  containerClasses: string[]
  detailClasses: string[]
}

interface State {
  detailsVisible: boolean
  id: number
}

export class Collapse implements m.ClassComponent<Attrs> {
  state: State 
  static idsCounter: number = 1

  constructor() {
    this.state = { detailsVisible: false, id: Collapse.idsCounter++ }
  }

  onupdate() {
    const collapse = new BCollapse('#' + this.state.id)
    if(this.state.detailsVisible) {
      collapse.show()
    } else {
      collapse.hide()
    }
  }

  view({attrs}: m.CVnode<Attrs>) {
    return m(combineElementWithClasses('', attrs.containerClasses), 
      {onclick: () => this.state.detailsVisible = !this.state.detailsVisible }, [
        attrs.info(this.state.detailsVisible), 
        m(
          combineElementWithClasses('.collapse', attrs.detailClasses),
           {id: this.state.id, 'is-nav': false},
           //this.state.detailsVisible ? attrs.details : undefined
           attrs.details
        )        
      ])    
  }
}
