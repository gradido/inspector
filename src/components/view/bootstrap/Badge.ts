import m from 'mithril'

interface Attrs {
  icon: string
  backgroundColor: string
}

export class Badge implements m.ClassComponent<Attrs> {
  view({ attrs: { icon, backgroundColor } }: m.CVnode<Attrs>) {
    return m(
      'span.b-avatar.rounded-5.badge',
      { style: { backgroundColor, width: '42px', height: '42px' } },
      m('span.b-avatar-custom', m.trust(icon)),
    )
  }
}
