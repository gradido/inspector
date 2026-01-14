import m from 'mithril'
import deferredIcon from '~icons/bi/clock'
import link45degIcon from '~icons/bi/link-45deg'
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

export class DeferredTransferView implements m.ClassComponent<ViewAttrs> {
  viewDetails(attrs: ViewAttrs) {
    if (!attrs.transaction.gradidoTransaction.bodyBytes.deferredTransfer) {
      throw new Error(
        `invalid transaction, expect DeferredTransfer, but get: ${JSON.stringify(attrs)}`,
      )
    }
    const transfer = attrs.transaction.gradidoTransaction.bodyBytes.deferredTransfer.transfer
    const timeout = attrs.transaction.gradidoTransaction.bodyBytes.deferredTransfer.timeout
    const signaturePairs = attrs.transaction.gradidoTransaction.signatureMap
    const communityId = attrs.communityId

    return m('', [
      m('.row', [
        m('.col', t.__('Transaction Number')),
        m('.col.text-end', attrs.transaction.id),
      ]),
      m(LedgerAnchorView, { ledgerAnchor: attrs.transaction.ledgerAnchor }),
      m(SignaturesView, { signaturePairs }),
      m('.fw-bold.pb-1.mt-3', t.__('Deferred Transfer')),
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
      m('.row', [m('.col', t.__('Valid for')), m('.col.text-end', timeout)]),
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
      firstRow: m(Badge, {
        icon: deferredIcon,
        backgroundColor: 'RGBA(var(--bs-secondary-rgb),var(--bs-bg-opacity,1))',
      }),
      secondRow: {
        text: t.__('Deferred Transfer Transaction'),
        date: attrs.transaction.confirmedAt,
      },
      thirdRow: {
        label: t.__('Charged'),
        amount: getAmount(attrs.transaction.gradidoTransaction.bodyBytes),
        sub: {
          label: t.__('via Link'),
          icon: m.trust(link45degIcon),
        },
      },
      id: attrs.transaction.id,
      details: this.viewDetails(attrs),
      detailClasses: ['pt-lg-3', 'pb-4'],
    })
  }
}
