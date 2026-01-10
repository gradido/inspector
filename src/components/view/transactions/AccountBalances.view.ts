import m from 'mithril'
import type { AccountBalance } from '../../../schemas/transaction.schema'
import { formatCurrency4 } from '../../../utils/utils'
import { CommunityLink } from '../CommunityLink'
import { PublicKeyLink } from '../PublicKeyLink'

interface ViewAttrs {
  accountBalances: AccountBalance[]
  communityId: string
  publicKeyFieldLabel?: string
}

export class AccountBalancesView implements m.ClassComponent<ViewAttrs> {
  view({ attrs }: m.CVnode<ViewAttrs>) {
    return [
      m('.fw-bold.pb-2', t.__('Account Balances')),
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
          m('.col.text-end', formatCurrency4(accountBalance.balance)),
        ]),
        accountBalance.communityId
          ? m('.row', [
              m('.col', t.__('Origin Community')),
              m('.col.text-end', m(CommunityLink, { communityId: accountBalance.communityId })),
            ])
          : null,
        m('.row.pb-2'),
      ]),
    ]
  }
}
