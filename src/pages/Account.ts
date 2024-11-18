import m from 'mithril'

interface Attrs {
  id: string
}

interface State {
}

export const Account: m.Component<Attrs, State> = {
  oninit: ({attrs, state}) => {
    
  },
  view: ({attrs, state}) => {
      return m('', attrs.id)
  }
}

export default Account
