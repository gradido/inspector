import m from 'mithril'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import { getAmount } from '../../../models/transactionBody'
import deferredIcon from '~icons/bi/clock'
import link45degIcon from '~icons/bi/link-45deg'
import { ViewAttrs } from './viewAttrs'

export class DeferredTransferView implements m.ClassComponent<ViewAttrs> {
  view({attrs}: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, {icon: deferredIcon, backgroundColor: 'RGBA(var(--bs-secondary-rgb),var(--bs-bg-opacity,1))'}),
      secondRow: {
        text: t.__('Deferred Transfer Transaction'),
        date: attrs.transaction.confirmedAt
      },
      thirdRow: {
        label: t.__('Charged'),
        amount: getAmount(attrs.transaction.gradidoTransaction.bodyBytes),
        sub: {
          label: t.__('via Link'),
          icon: m.trust(link45degIcon)
        }
      },
      id: attrs.transaction.id,
      details: m('div', 'deferred transfer details'),
    })
  }
}
