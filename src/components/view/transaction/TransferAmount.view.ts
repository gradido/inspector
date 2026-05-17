import m from 'mithril'
import type { TransferAmount } from '../../../schemas/basic.schema'
import { CommunityLink } from '../CommunityLink'
import { PublicKeyLink } from '../PublicKeyLink'
import { FormattedCurrency } from '../FormattedCurrency'

interface ViewAttrs {
  transferAmount: TransferAmount
  communityId: string
  publicKeyFieldLabel?: string
}

export class TransferAmountView implements m.ClassComponent<ViewAttrs> {
  view({ attrs }: m.CVnode<ViewAttrs>) {
    return [
      m('.row', [
        m('.col', attrs.publicKeyFieldLabel || t.__('Public Key')),
        m(
          '.col.text-end',
          m(PublicKeyLink, {
            publicKey: attrs.transferAmount.pubkey,
            communityId: attrs.communityId,
            maxLength: 32,
          }),
        ),
      ]),
      m('.row', [
        m('.col', t.__('Amount')),
        m('.col.text-end', m(FormattedCurrency, { value: attrs.transferAmount.amount })),
      ]),
      attrs.transferAmount.communityId
        ? m('.row', [
            m('.col', t.__('Origin Community')),
            m(
              '.col.text-end',
              m(CommunityLink, {
                communityId: attrs.transferAmount.communityId,
              }),
            ),
          ])
        : null,
    ]
  }
}
