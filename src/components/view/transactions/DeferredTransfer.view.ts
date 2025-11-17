import m from 'mithril'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import { getAmount } from '../../../models/transactionBody'
import deferredIcon from '~icons/bi/clock'
import link45degIcon from '~icons/bi/link-45deg'
import { ViewAttrs } from './viewAttrs'
import { SignaturesView } from './Signatures.view'
import { TransferAmountView } from './TransferAmount.view'
import { AccountBalancesView } from './AccountBalances.view'
import { PublicKeyLink } from '../PublicKeyLink'
import { MemosView } from './Memos.view'

export class DeferredTransferView implements m.ClassComponent<ViewAttrs> {
  viewDetails(attrs: ViewAttrs) {
    const transfer = attrs.transaction.gradidoTransaction.bodyBytes.deferredTransfer.transfer
    const timeout = attrs.transaction.gradidoTransaction.bodyBytes.deferredTransfer.timeout
    const signaturePairs = attrs.transaction.gradidoTransaction.signatureMap
    const communityId = attrs.communityId

    return m('', [
      m(SignaturesView, {signaturePairs}),
      m('.fw-bold.pb-1.mt-3', t.__('Deferred Transfer')),
      m(MemosView, { memos: attrs.transaction.gradidoTransaction.bodyBytes.memos }),
      m(TransferAmountView, { transferAmount: transfer.sender, communityId, publicKeyFieldLabel: t.__('Sender') }),
      m('.row', [
        m('.col', t.__('Recipient')),
        m('.col.text-end', m(PublicKeyLink, { publicKey: transfer.recipient, communityId: attrs.communityId, maxLength: 32 }))
      ]),
      m('.row', [
        m('.col', t.__('Valid for')),
        m('.col.text-end', timeout)
      ]),
      m('.mt-3'),
      m(AccountBalancesView, { accountBalances: attrs.transaction.accountBalances, communityId, publicKeyFieldLabel: t.__('Account') })
    ])
  }

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
      details: this.viewDetails(attrs),
      detailClasses: ['pt-lg-3', 'pb-4'],
    })
  }
}
