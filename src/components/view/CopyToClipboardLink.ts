import m from 'mithril'

interface Attrs {
  data: string
  name: string
  maxLength?: number
}

export class CopyToClipboardLink implements m.ClassComponent<Attrs> {
  view({ attrs }: m.CVnode<Attrs>) {
    let data = attrs.data
    if (attrs.maxLength && attrs.data.length > attrs.maxLength - 3) {
      const partLength = Math.floor((attrs.maxLength - 3) / 2)
      data =
        attrs.data.substring(0, partLength) +
        '...' +
        attrs.data.substring(attrs.data.length - partLength)
    }
    return m(
      'a',
      {
        onclick: () => {
          navigator.clipboard.writeText(attrs.data)
          toaster.success(`${attrs.name} ${t.__('copied to clipboard')}`)
        },
        title: attrs.name,
      },
      data,
    )
  }
}
