import m from 'mithril'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import transferIcon from '~icons/bi/cash-stack'
import { getAmount } from '../../../models/transactionBody'
import { ViewAttrs } from './viewAttrs'

export class GradidoTransferView implements m.ClassComponent<ViewAttrs> {
  view({attrs}: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, {icon: transferIcon, backgroundColor: '#5e72e4'}),
      secondRow: {
        text: t.__('Transfer Transaction'),
        date: attrs.transaction.confirmedAt
      },
      thirdRow: {
        label: t.__('Transferred'),
        amount: getAmount(attrs.transaction.gradidoTransaction.bodyBytes),
      },
      id: attrs.transaction.id,
      details: m('div', 'transfer details'),
      detailClasses: ['pt-lg-3', 'pb-4'],
    })
  }
}
