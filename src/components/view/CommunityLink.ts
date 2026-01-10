import m from 'mithril'

interface Attrs {
  communityId: string
}

export class CommunityLink implements m.ClassComponent<Attrs> {
  view({ attrs }: m.CVnode<Attrs>) {
    return m(
      'a',
      {
        href: `${m.route.prefix}/${attrs.communityId}`,
        title: attrs.communityId,
      },
      attrs.communityId,
    )
  }
}
