import m from 'mithril'
import type { AccountBalance } from '../../../schemas/transaction.schema'
import { formatCurrency } from '../../../utils/utils'
import { CommunityLink } from '../CommunityLink'
import { PublicKeyLink } from '../PublicKeyLink'
import { BalanceDerivationType, getBalanceDerivationTypeString } from '../../../enum/BalanceDerivationType'

interface ViewAttrs {
  accountBalances: AccountBalance[]
  balanceDerivationType: BalanceDerivationType
  communityId: string
  publicKeyFieldLabel?: string
}

export class AccountBalancesView implements m.ClassComponent<ViewAttrs> {
  view({ attrs }: m.CVnode<ViewAttrs>) {
    return [
      m('.fw-bold.pb-2', t.__('Account Balances')), [
        m('.row', [
          m('.col', t.__('Balance Derivation Type')),
          m('.col.text-end', getBalanceDerivationTypeString(attrs.balanceDerivationType)),
        ]),
        attrs.accountBalances.map((accountBalance) => [
          m('.row', [
            m('.col', attrs.publicKeyFieldLabel || t.__('Public Key')),
            m(
              '.col.text-end',
              m(PublicKeyLink, {
                publicKey: accountBalance.pubkey,
                communityId: attrs.communityId,
                maxLength: 32,
              }),
            ),
          ]),
          m('.row', [
            m('.col', t.__('Balance')),
            m('.col.text-end', formatCurrency(accountBalance.balance)),
          ]),
          accountBalance.coinCommunityId != attrs.communityId
            ? m('.row', [
                m('.col', t.__('Origin Community')),
                m('.col.text-end', m(CommunityLink, { communityId: accountBalance.coinCommunityId })),
              ])
            : null,
          m('.row.pb-2'),
        ]),
      ]
    ]
  }
}
