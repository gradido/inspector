import m from 'mithril'
import { CommunityRoot } from '../../../schemas/transaction.schema'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import boxesIcon from '~icons/bi/boxes'
import { ViewAttrs } from './viewAttrs'
import { PublicKeyLink } from '../PublicKeyLink'
import { PublicKeyCopy } from '../PublicKeyCopy'

export class CommunityRootView implements m.ClassComponent<ViewAttrs> {

  viewDetails(communityRoot: CommunityRoot, communityId: string) {
    return m('', [
      m('.row.mt-3', [
        m('.col', t.__('Root Public Key')),
        m('.col', m(PublicKeyCopy, {publicKey: communityRoot.pubkey}))
      ]),
      m('.row.mt-1', [
        m('.col', t.__('GMW Public Key')),
        m('.col', m(PublicKeyLink, {publicKey: communityRoot.gmwPubkey, communityId}))
      ]),
      m('.row.mt-1.mb-2', [
        m('.col', t.__('AUF Public Key')),
        m('.col', m(PublicKeyLink, {publicKey: communityRoot.aufPubkey, communityId}))
      ])
    ])
  }

  view({attrs}: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, {icon: boxesIcon, backgroundColor: 'RGBA(var(--bs-primary-rgb),var(--bs-bg-opacity,1))'}),
      secondRow: {
        text: t.__('Community Root Transaction'),
        date: attrs.transaction.confirmedAt
      },
      thirdRow: {
        label: '',
        amount: '0',
      },
      id: attrs.transaction.id,
      details: this.viewDetails(attrs.transaction.gradidoTransaction.bodyBytes.communityRoot, attrs.communityId),
    })
  }
}
