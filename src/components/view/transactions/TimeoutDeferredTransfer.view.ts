import m from 'mithril'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import { getAmount } from '../../../models/transactionBody'
import timeoutIcon from '~icons/bi/clock-history'
import link45degIcon from '~icons/bi/link-45deg'
import { ViewAttrs } from './viewAttrs'

export class TimeoutDeferredTransferView implements m.ClassComponent<ViewAttrs> {
  view({attrs}: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, {icon: timeoutIcon, backgroundColor: 'red'}),
      secondRow: {
        text: t.__('Timeout Deferred Transfer Transaction'),
        date: attrs.transaction.confirmedAt
      },
      thirdRow: {
        label: t.__('Received Back'),
        amount: getAmount(attrs.transaction.gradidoTransaction.bodyBytes),
        sub: {
          label: t.__('via Link'),
          icon: m.trust(link45degIcon)
        }
      },
      id: attrs.transaction.id,
      details: m('div', 'timeout deferred transfer details'),
      detailClasses: ['pt-lg-3', 'pb-4'],
    })
  }
}
