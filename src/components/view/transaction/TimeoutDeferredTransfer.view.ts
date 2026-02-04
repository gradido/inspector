import m from 'mithril'
import timeoutIcon from '~icons/bi/clock-history'
import link45degIcon from '~icons/bi/link-45deg'
import { getAmount } from '../../../models/transactionBody'
import { Badge } from '../bootstrap/Badge'
import { DetailsBlock } from '../DetailsBlock'
import type { ViewAttrs } from './viewAttrs'
import { LedgerAnchorView } from './LedgerAnchor.view'
import { AccountBalancesView } from './AccountBalances.view'

export class TimeoutDeferredTransferView implements m.ClassComponent<ViewAttrs> {
  viewDetails(attrs: ViewAttrs) {
    return m('', [
      m('.row', [
        m('.col', t.__('Transaction Number')),
        m('.col.text-end', attrs.transaction.id),
      ]),
      m(LedgerAnchorView, { ledgerAnchor: attrs.transaction.ledgerAnchor }),
      m(AccountBalancesView, {
        accountBalances: attrs.transaction.accountBalances,
        balanceDerivationType: attrs.transaction.balanceDerivationType,
        communityId: attrs.communityId,
        publicKeyFieldLabel: t.__('Account'),
      }),
    ])
  }

  view({ attrs }: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, { icon: timeoutIcon, backgroundColor: 'red' }),
      secondRow: {
        text: t.__('Timeout Deferred Transfer Transaction'),
        date: attrs.transaction.confirmedAt,
      },
      thirdRow: {
        label: t.__('Received Back'),
        amount: undefined, //getAmount(attrs.transaction.gradidoTransaction.bodyBytes),
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
