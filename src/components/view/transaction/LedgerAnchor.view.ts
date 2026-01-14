import m from 'mithril'
import type { LedgerAnchor } from '../../../schemas/basic.schema'
import { getLedgerAnchorTypeString } from '../../../enum/LedgerAnchorType'

interface ViewAttrs {
  ledgerAnchor: LedgerAnchor
}

export class LedgerAnchorView implements m.ClassComponent<ViewAttrs> {
  view({ attrs }: m.CVnode<ViewAttrs>) {
    return [
      m('.row', [
        m('.col', getLedgerAnchorTypeString(attrs.ledgerAnchor.type)),
        m('.col.text-end', attrs.ledgerAnchor.value),
      ]),
    ]
  }
}
