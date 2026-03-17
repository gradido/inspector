import m from 'mithril'
import { CONFIG } from '../../../config/index'
import { getLedgerAnchorTypeString, LedgerAnchorType } from '../../../enum/LedgerAnchorType'
import type { LedgerAnchor } from '../../../schemas/basic.schema'

interface ViewAttrs {
  ledgerAnchor: LedgerAnchor
  communityId: string
}

export class LedgerAnchorView implements m.ClassComponent<ViewAttrs> {
  viewLink(ledgerAnchor: LedgerAnchor, communityId: string) {
    let baseLink: string | undefined
    switch (ledgerAnchor.type) {
      case LedgerAnchorType.HIERO_TRANSACTION_ID:
        baseLink = `${CONFIG.HIERO_BLOCKCHAIN_EXPLORER_URL_TRANSACTION_DETAILS}/${ledgerAnchor.value}`
        break
      case LedgerAnchorType.NODE_TRIGGER_TRANSACTION_ID:
        baseLink = `/${communityId}/transaction/${ledgerAnchor.value}`
        break
      default:
        break
    }
    if (!baseLink) {
      return ledgerAnchor.value
    }
    return m(
      'a',
      {
        href: baseLink,
        target: '_blank',
      },
      ledgerAnchor.value,
    )
  }

  view({ attrs }: m.CVnode<ViewAttrs>) {
    return [
      m('.row', [
        m('.col', getLedgerAnchorTypeString(attrs.ledgerAnchor.type)),
        m('.col.text-end', this.viewLink(attrs.ledgerAnchor, attrs.communityId)),
      ]),
    ]
  }
}
