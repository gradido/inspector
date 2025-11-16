import m from 'mithril'

interface Attrs {
  publicKey: string
}

export class PublicKeyCopy implements m.ClassComponent<Attrs> {
  view({attrs}: m.CVnode<Attrs>) {
    return m('a', { onclick: () => {
      navigator.clipboard.writeText(attrs.publicKey)
      toaster.success(t.__('Public Key copied to clipboard'))
    }}, attrs.publicKey)
  }
}