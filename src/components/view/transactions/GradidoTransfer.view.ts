import m from 'mithril'
import transferIcon from '~icons/bi/cash-stack'
import { getAmount } from '../../../models/transactionBody'
import { Badge } from '../bootstrap/Badge'
import { DetailsBlock } from '../DetailsBlock'
import { PublicKeyLink } from '../PublicKeyLink'
import { AccountBalancesView } from './AccountBalances.view'
import { MemosView } from './Memos.view'
import { SignaturesView } from './Signatures.view'
import { TransferAmountView } from './TransferAmount.view'
import type { ViewAttrs } from './viewAttrs'
import { LedgerAnchorView } from './LedgerAnchor.view'

export class GradidoTransferView implements m.ClassComponent<ViewAttrs> {
  viewDetails(attrs: ViewAttrs) {
    const transfer = attrs.transaction.gradidoTransaction.bodyBytes.transfer
    const signaturePairs = attrs.transaction.gradidoTransaction.signatureMap
    const communityId = attrs.communityId

    if (!transfer) {
      throw new Error(
        `invalid transaction, expect transfer, but get: ${JSON.stringify(attrs)}`,
      )
    }

    return m('', [
      m('.row', [
        m('.col', t.__('Transaction Number')),
        m('.col.text-end', attrs.transaction.id),
      ]),
      m(LedgerAnchorView, { ledgerAnchor: attrs.transaction.ledgerAnchor }),
      m(SignaturesView, { signaturePairs }),
      m('.fw-bold.pb-1.mt-3', t.__('Transfer')),
      m(MemosView, {
        memos: attrs.transaction.gradidoTransaction.bodyBytes.memos,
      }),
      m(TransferAmountView, {
        transferAmount: transfer.sender,
        communityId,
        publicKeyFieldLabel: t.__('Sender'),
      }),
      m('.row', [
        m('.col', t.__('Recipient')),
        m(
          '.col.text-end',
          m(PublicKeyLink, {
            publicKey: transfer.recipient,
            communityId: attrs.communityId,
            maxLength: 32,
          }),
        ),
      ]),
      m('.mt-3'),
      m(AccountBalancesView, {
        accountBalances: attrs.transaction.accountBalances,
        balanceDerivationType: attrs.transaction.balanceDerivationType,
        communityId,
        publicKeyFieldLabel: t.__('Account'),
      }),
    ])
  }

  view({ attrs }: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, { icon: transferIcon, backgroundColor: '#5e72e4' }),
      secondRow: {
        text: t.__('Transfer Transaction'),
        date: attrs.transaction.confirmedAt,
      },
      thirdRow: {
        label: t.__('Transferred'),
        amount: getAmount(attrs.transaction.gradidoTransaction.bodyBytes),
      },
      id: attrs.transaction.id,
      details: this.viewDetails(attrs),
      detailClasses: ['pt-lg-3', 'pb-4'],
    })
  }
}
