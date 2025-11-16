import m from 'mithril'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import { getAmount } from '../../../models/transactionBody'
import transferIcon from '~icons/bi/cash-stack'
import link45degIcon from '~icons/bi/link-45deg'
import { ViewAttrs } from './viewAttrs'

export class RedeemDeferredTransferView implements m.ClassComponent<ViewAttrs> {
  view({attrs}: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, {icon: transferIcon, backgroundColor: '#8965e0'}),
      secondRow: {
        text: t.__('Redeem Deferred Transfer Transaction'),
        date: attrs.transaction.confirmedAt
      },
      thirdRow: {
        label: t.__('Transferred'),
        amount: getAmount(attrs.transaction.gradidoTransaction.bodyBytes),
        sub: {
          label: t.__('via Link'),
          icon: m.trust(link45degIcon)
        }
      },
      id: attrs.transaction.id,
      details: m('div', 'redeem deferred transfer details'),
    })
  }
}
