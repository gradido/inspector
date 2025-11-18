import m from 'mithril'
import eyeIcon from '~icons/bi/eye'
import eyeSlashIcon from '~icons/bi/eye-slash'

interface Attrs {
  visible: boolean
  classes: string[]
}

export class Eye implements m.ClassComponent<Attrs> {
  pickPaths(visible: boolean): m.Child {
    if(visible) {
      return m.trust(eyeIcon)
    } else {
      return m.trust(eyeSlashIcon)
    }
  }
  view({attrs: {visible, classes}}: m.CVnode<Attrs>) {
    return m('span', {classes}, this.pickPaths(visible))
  }
}
