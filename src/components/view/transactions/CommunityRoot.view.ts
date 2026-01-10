import m from 'mithril'
import boxesIcon from '~icons/bi/boxes'
import { Badge } from '../bootstrap/Badge'
import { CopyToClipboardLink } from '../CopyToClipboardLink'
import { DetailsBlock } from '../DetailsBlock'
import { PublicKeyLink } from '../PublicKeyLink'
import { SignaturesView } from './Signatures.view'
import type { ViewAttrs } from './viewAttrs'
import { LedgerAnchorView } from './LedgerAnchor.view'

export class CommunityRootView implements m.ClassComponent<ViewAttrs> {
  viewDetails(attrs: ViewAttrs) {
    const gradidoTransaction = attrs.transaction.gradidoTransaction
    const communityRoot = gradidoTransaction.bodyBytes.communityRoot
    if (!communityRoot) {
      throw new Error(
        `invalid transaction, expect CommunityRoot, but get: ${JSON.stringify(attrs)}`,
      )
    }
    const signaturePairs = gradidoTransaction.signatureMap
    const communityId = attrs.communityId
    return m('', [
      m('.row', [
        m('.col', t.__('Transaction Number')),
        m('.col.text-end', attrs.transaction.id),
      ]),
      m(LedgerAnchorView, { ledgerAnchor: attrs.transaction.ledgerAnchor }),
      m(SignaturesView, { signaturePairs }),
      m('.fw-bold.pb-2.mt-3', t.__('Community Root')),
      m('.row', [
        m('.col', t.__('Root Public Key')),
        m(
          '.col',
          m(CopyToClipboardLink, {
            data: communityRoot.pubkey,
            name: t.__('Root Public Key'),
          }),
        ),
      ]),
      m('.row.mt-1', [
        m('.col', t.__('GMW Public Key')),
        m('.col', m(PublicKeyLink, { publicKey: communityRoot.gmwPubkey, communityId })),
      ]),
      m('.row.mt-1', [
        m('.col', t.__('AUF Public Key')),
        m('.col', m(PublicKeyLink, { publicKey: communityRoot.aufPubkey, communityId })),
      ]),
    ])
  }

  view({ attrs }: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, {
        icon: boxesIcon,
        backgroundColor: 'RGBA(var(--bs-primary-rgb),var(--bs-bg-opacity,1))',
      }),
      secondRow: {
        text: t.__('Community Root Transaction'),
        date: attrs.transaction.confirmedAt,
      },
      thirdRow: {
        label: t.__('Started'),
      },
      id: attrs.transaction.id,
      details: this.viewDetails(attrs),
      detailClasses: ['pt-lg-3', 'pb-4'],
    })
  }
}
