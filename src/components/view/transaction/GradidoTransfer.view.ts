import m from 'mithril'
import transferIcon from '~icons/bi/cash-stack'
import crossGroupIcon from '~icons/bi/globe'
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
import { CrossGroupType } from '../../../enum/CrossGroupType'

export class GradidoTransferView implements m.ClassComponent<ViewAttrs> {
  viewDetails(attrs: ViewAttrs, crossGroupType: CrossGroupType) {
    const transfer = attrs.transaction.gradidoTransaction.bodyBytes.transfer
    const signaturePairs = attrs.transaction.gradidoTransaction.signatureMap
    let senderCommunityId = attrs.communityId
    let recipientCommunityId = attrs.communityId
    const otherCommunity = attrs.transaction.gradidoTransaction.bodyBytes.otherCommunity
    if (crossGroupType !== CrossGroupType.LOCAL && !otherCommunity) {
      throw new Error(
        `invalid cross group transaction, expect otherCommunity, but get: ${JSON.stringify(attrs)}`,
      )
    } else {
      if (crossGroupType === CrossGroupType.INBOUND) {
        senderCommunityId = otherCommunity!
      } else if (crossGroupType === CrossGroupType.OUTBOUND) {
        recipientCommunityId = otherCommunity!
      }
    }
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
        communityId: senderCommunityId,
        publicKeyFieldLabel: t.__('Sender'),
      }),
      m('.row', [
        m('.col', t.__('Recipient')),
        m(
          '.col.text-end',
          m(PublicKeyLink, {
            publicKey: transfer.recipient,
            communityId: recipientCommunityId,
            maxLength: 32,
          }),
        ),
      ]),
      m('.mt-3'),
      m(AccountBalancesView, {
        accountBalances: attrs.transaction.accountBalances,
        balanceDerivationType: attrs.transaction.balanceDerivationType,
        communityId: attrs.communityId,
        publicKeyFieldLabel: t.__('Account'),
      }),
    ])
  }

  thirdRowView(attrs: ViewAttrs, crossGroupType: CrossGroupType, amount:string) {
    if(CrossGroupType.INBOUND === crossGroupType) {
      return {
        label: t.__('Received'),
        amount,
        sub: {
          label: `${t.__('via community')} `,
          icon: m.trust(crossGroupIcon),
        }
      }
    } else if(CrossGroupType.OUTBOUND === crossGroupType) {
      return {
        label: t.__('Sent'),
        amount: `-${amount}`,
        sub: {
          label: `${t.__('via community')} `,
          icon: m.trust(crossGroupIcon),
        }
      }
    }
    return {
      label: t.__('Transferred'),
      amount,
    }
  }

  view({ attrs }: m.CVnode<ViewAttrs>) {
    const crossGroupType = attrs.transaction.gradidoTransaction.bodyBytes.type    
    return m(DetailsBlock, {
      firstRow: m(Badge, { icon: transferIcon, backgroundColor: '#5e72e4' }),
      secondRow: {
        text: t.__('Transfer Transaction'),
        date: attrs.transaction.confirmedAt,
      },
      thirdRow: this.thirdRowView(attrs, crossGroupType, getAmount(attrs.transaction.gradidoTransaction.bodyBytes)),
      id: attrs.transaction.ledgerAnchor.value || attrs.transaction.id.toString(),
      details: this.viewDetails(attrs, crossGroupType),
      detailClasses: ['pt-lg-3', 'pb-4'],
    })
  }
}
