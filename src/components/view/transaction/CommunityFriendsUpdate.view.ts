import m from 'mithril'
import friendsIcon from '~icons/bi/bezier2'
import { Badge } from '../bootstrap/Badge'
import { DetailsBlock } from '../DetailsBlock'
import type { ViewAttrs } from './viewAttrs'

export class CommunityFriendsUpdateView implements m.ClassComponent<ViewAttrs> {
  view({ attrs }: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, {
        icon: friendsIcon,
        backgroundColor: 'RGBA(var(--bs-primary-rgb),var(--bs-bg-opacity,1))',
      }),
      secondRow: {
        text: t.__('Community Friends Update Transaction'),
        date: attrs.transaction.confirmedAt,
      },
      thirdRow: {
        label: t.__('Friends'),
        amount: '0',
      },
      id: attrs.transaction.id,
      details: m('div', 'community friends update details'),
    })
  }
}
