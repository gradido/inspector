import m from 'mithril'
import type { SignaturePair } from '../../../schemas/basic.schema'
import { CopyToClipboardLink } from '../CopyToClipboardLink'

interface ViewAttrs {
  signaturePairs: SignaturePair[]
}

export class SignaturesView implements m.ClassComponent<ViewAttrs> {
  view({ attrs }: m.CVnode<ViewAttrs>) {
    return [
      m('.fw-bold.pb-2', t.__('Signature - Public Key Pairs')),
      attrs.signaturePairs.map((signaturePair) => [
        m('.row', [
          m('.col', t.__('Public Key')),
          m(
            '.col',
            m(CopyToClipboardLink, {
              data: signaturePair.pubkey,
              name: t.__('Public Key'),
            }),
          ),
        ]),
        m('.row', [
          m('.col', t.__('Signature')),
          m(
            '.col',
            m(CopyToClipboardLink, {
              data: signaturePair.signature,
              name: t.__('Signature'),
              maxLength: 64,
            }),
          ),
        ]),
        m('.row.pb-2'),
      ]),
    ]
  }
}
