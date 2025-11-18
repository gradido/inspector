import m from 'mithril'

interface Attrs {
  publicKey: string
  communityId: string
  maxLength?: number
}

export class PublicKeyLink implements m.ClassComponent<Attrs> {
  view({attrs}: m.CVnode<Attrs>) {
    let publicKey = attrs.publicKey
    if(attrs.maxLength && attrs.publicKey.length > attrs.maxLength - 3) {
      const partLength = Math.floor((attrs.maxLength - 3) / 2)
      publicKey = attrs.publicKey.substring(0, partLength) + '...' + attrs.publicKey.substring(attrs.publicKey.length - partLength)
    }
    return m('a', {href: `${m.route.prefix}/account/${attrs.communityId}/${attrs.publicKey}`, title: attrs.publicKey}, publicKey)
  }
}