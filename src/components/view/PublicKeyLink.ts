import m from 'mithril'

interface Attrs {
  publicKey: string
  communityId: string
}

export class PublicKeyLink implements m.ClassComponent<Attrs> {
  view({attrs}: m.CVnode<Attrs>) {
    return m('a', {href: `${m.route.prefix}/account/${attrs.communityId}/${attrs.publicKey}`, title: attrs.publicKey}, attrs.publicKey)
  }
}