import m from 'mithril'

interface Attrs {
  title: string
}


export const Title: m.Component<Attrs> = {
  
  view: ({attrs}) => {
    return m('.row.breadcrumb', 
      m('.offset-lg-2.col-10',
        m('.page-breadcrumb.breadcrumb.bg-transparent', 
          m('h1', attrs.title)
        )
      )
    )
  }
}