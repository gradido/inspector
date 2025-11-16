import m from 'mithril'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import giftIcon from '~icons/bi/gift'
import { getAmount } from '../../../models/transactionBody'
import { ViewAttrs } from './viewAttrs'

export class CreationView implements m.ClassComponent<ViewAttrs> {
  view({attrs}: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, {icon: giftIcon, backgroundColor: 'RGBA(var(--bs-success-rgb),var(--bs-bg-opacity,1))'}),
      secondRow: {
        text: t.__('Creation Transaction'),
        date: attrs.transaction.confirmedAt
      },
      thirdRow: {
        label: t.__('Created'),
        amount: getAmount(attrs.transaction.gradidoTransaction.bodyBytes),
      },
      id: attrs.transaction.id,
      details: m('div', 'creation details'),
    })
  }
}
