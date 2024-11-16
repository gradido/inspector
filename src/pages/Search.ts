import m from 'mithril'

interface Attrs {
}

interface State {
}

export const Search: m.Component<Attrs, State> = {
  oninit: ({attrs, state}) => {
    
  },
  view: ({attrs, state}) => {
      return m('', 'search')
  }
}

export default Search
