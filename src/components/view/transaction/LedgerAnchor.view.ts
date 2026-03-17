import m from 'mithril'
import { CONFIG } from '../../../config/index'
import { getLedgerAnchorTypeString, LedgerAnchorType } from '../../../enum/LedgerAnchorType'
import type { LedgerAnchor } from '../../../schemas/basic.schema'

interface ViewAttrs {
  ledgerAnchor: LedgerAnchor
  communityId: string
}

export class LedgerAnchorView implements m.ClassComponent<ViewAttrs> {
  formatValue(ledgerAnchor: LedgerAnchor, communityId: string) {
    switch (ledgerAnchor.type) {
      case LedgerAnchorType.HIERO_TRANSACTION_ID:
        return m(
          'a',
          {
            href: `${CONFIG.HIERO_BLOCKCHAIN_EXPLORER_URL_TRANSACTION_DETAILS}/${ledgerAnchor.value}`,
            target: '_blank',
          },
          ledgerAnchor.value,
        )
      case LedgerAnchorType.NODE_TRIGGER_TRANSACTION_ID:
        return m(
          m.route.Link,
          { href: `/transaction/${communityId}/${ledgerAnchor.value}` },
          ledgerAnchor.value,
        )
      default:
        break
    }
    return ledgerAnchor.value
  }

  view({ attrs }: m.CVnode<ViewAttrs>) {
    return [
      m('.row', [
        m('.col', getLedgerAnchorTypeString(attrs.ledgerAnchor.type)),
        m('.col.text-end', this.formatValue(attrs.ledgerAnchor, attrs.communityId)),
      ]),
    ]
  }
}
