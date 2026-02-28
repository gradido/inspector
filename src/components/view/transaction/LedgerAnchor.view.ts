import m from 'mithril'
import type { LedgerAnchor } from '../../../schemas/basic.schema'
import { getLedgerAnchorTypeString } from '../../../enum/LedgerAnchorType'
import { CONFIG } from '../../../config/index'

interface ViewAttrs {
  ledgerAnchor: LedgerAnchor
}

export class LedgerAnchorView implements m.ClassComponent<ViewAttrs> {

  viewLink(ledgerAnchor: LedgerAnchor) {
    return m('a', {
      href: CONFIG.HIERO_BLOCKCHAIN_EXPLORER_URL_TRANSACTION_DETAILS + ledgerAnchor.value,
      target: '_blank',
    }, ledgerAnchor.value)
  }

  view({ attrs }: m.CVnode<ViewAttrs>) {
    return [
      m('.row', [
        m('.col', getLedgerAnchorTypeString(attrs.ledgerAnchor.type)),
        m('.col.text-end', this.viewLink(attrs.ledgerAnchor)),
      ]),
    ]
  }
}
