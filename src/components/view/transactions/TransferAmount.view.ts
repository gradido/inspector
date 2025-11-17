import m from 'mithril'
import { TransferAmount } from '../../../schemas/basic.schema'
import { PublicKeyLink } from '../PublicKeyLink'
import { CommunityLink } from '../CommunityLink'
import { formatGDD } from '../../../utils/utils'

interface ViewAttrs {
  transferAmount: TransferAmount
  communityId: string
  publicKeyFieldLabel?: string
}

export class TransferAmountView implements m.ClassComponent<ViewAttrs> {
  view({attrs}: m.CVnode<ViewAttrs>) {
    return [
      m('.row', [
        m('.col', attrs.publicKeyFieldLabel || t.__('Public Key')),
        m('.col.text-end', m(PublicKeyLink, { publicKey: attrs.transferAmount.pubkey, communityId: attrs.communityId, maxLength: 32 })),
      ]),
      m('.row', [
        m('.col', t.__('Amount')),
        m('.col.text-end', formatGDD(attrs.transferAmount.amount)),
      ]),
      attrs.transferAmount.communityId ? m('.row', [
        m('.col', t.__('Origin Community')),
        m('.col.text-end', m(CommunityLink, { communityId: attrs.transferAmount.communityId })),
      ]) : null
    ]
  }
}