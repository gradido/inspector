import m, { redraw } from 'mithril'

interface Attrs {
  communityId: string
}

export class CommunityLink implements m.ClassComponent<Attrs> {
  view({ attrs }: m.CVnode<Attrs>) {
    const community = globalThis.communities?.get(attrs.communityId)
    return m(
      m.route.Link, {
        href: `/${attrs.communityId}`,
        title: attrs.communityId,
      },
      community?.alias || attrs.communityId,
    )
  }
}
