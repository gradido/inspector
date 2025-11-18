import m from 'mithril'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import { getAmount } from '../../../models/transactionBody'
import transferIcon from '~icons/bi/cash-stack'
import link45degIcon from '~icons/bi/link-45deg'
import { ViewAttrs } from './viewAttrs'
import { SignaturesView } from './Signatures.view'
import { MemosView } from './Memos.view'
import { TransferAmountView } from './TransferAmount.view'
import { AccountBalancesView } from './AccountBalances.view'
import { PublicKeyLink } from '../PublicKeyLink'

export class RedeemDeferredTransferView implements m.ClassComponent<ViewAttrs> {

  viewDetails(attrs: ViewAttrs) {
    const redeemDeferredTransfer = attrs.transaction.gradidoTransaction.bodyBytes.redeemDeferredTransfer
    if (!redeemDeferredTransfer) {
      throw new Error(`invalid transaction, expect redeemDeferredTransfer, but get: ${JSON.stringify(attrs)}`)
    }
    const transfer = redeemDeferredTransfer.transfer
    const signaturePairs = attrs.transaction.gradidoTransaction.signatureMap
    const communityId = attrs.communityId

    return m('', [
      m('.row.pb-2', [
        m('.col', t.__('Transaction Number')),
        m('.col.text-end', attrs.transaction.id)
      ]),
      m(SignaturesView, {signaturePairs}),
      m('.fw-bold.pb-1.mt-3', t.__('Redeem Deferred Transfer')),
      m(MemosView, { memos: attrs.transaction.gradidoTransaction.bodyBytes.memos }),
      m(TransferAmountView, { transferAmount: transfer.sender, communityId, publicKeyFieldLabel: t.__('Sender') }),
      m('.row', [
        m('.col', t.__('Recipient')),
        m('.col.text-end', m(PublicKeyLink, { publicKey: transfer.recipient, communityId: attrs.communityId, maxLength: 32 }))
      ]),
      m('.mt-3'),
      m(AccountBalancesView, { accountBalances: attrs.transaction.accountBalances, communityId, publicKeyFieldLabel: t.__('Account') })
    ])
  }

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
      details: this.viewDetails(attrs),
      detailClasses: ['pt-lg-3', 'pb-4'],
    })
  }
}
