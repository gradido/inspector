import m from 'mithril'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import giftIcon from '~icons/bi/gift'
import { getAmount } from '../../../models/transactionBody'
import { ViewAttrs } from './viewAttrs'
import { SignaturesView } from './Signatures.view'
import { TransferAmountView } from './TransferAmount.view'
import { formatDayMonthYear } from '../../../utils/utils'
import { AccountBalancesView } from './AccountBalances.view'
import { MemosView } from './Memos.view'

export class GradidoCreationView implements m.ClassComponent<ViewAttrs> {
  viewDetails(attrs: ViewAttrs) {
    const creation = attrs.transaction.gradidoTransaction.bodyBytes.creation
    const signaturePairs = attrs.transaction.gradidoTransaction.signatureMap
    const communityId = attrs.communityId

    return m('', [
      m(SignaturesView, {signaturePairs}),
      m('.fw-bold.pb-1.mt-3', t.__('Creation')),
      m(MemosView, { memos: attrs.transaction.gradidoTransaction.bodyBytes.memos }),
      m('.row', [
        m('.col', t.__('Creation Date')),
        m('.col.text-end', formatDayMonthYear(creation.targetDate))
      ]),
      m(TransferAmountView, { transferAmount: creation.recipient, communityId, publicKeyFieldLabel: t.__('Recipient') }),
      m('.mt-3'),
      m(AccountBalancesView, { accountBalances: attrs.transaction.accountBalances, communityId, publicKeyFieldLabel: t.__('Account') })
    ])
  }

  view({attrs}: m.CVnode<ViewAttrs>) {
    const amount = getAmount(attrs.transaction.gradidoTransaction.bodyBytes)
    const date = attrs.transaction.confirmedAt
    return m(DetailsBlock, {
      firstRow: m(Badge, {icon: giftIcon, backgroundColor: 'RGBA(var(--bs-success-rgb),var(--bs-bg-opacity,1))'}),
      secondRow: {
        text: t.__('Creation Transaction'),
        date,
      },
      thirdRow: {
        label: t.__('Created'),
        amount,
      },
      id: attrs.transaction.id,
      details: this.viewDetails(attrs),
      detailClasses: ['pt-lg-3', 'pb-4'],
    })
  }
}
