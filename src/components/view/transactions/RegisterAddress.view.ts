import m from 'mithril'
import { DetailsBlock } from '../DetailsBlock'
import { Badge } from '../bootstrap/Badge'
import registerIcon from '~icons/bi/card-checklist'
import { ViewAttrs } from './viewAttrs'

export class RegisterAddressView implements m.ClassComponent<ViewAttrs> {
  view({attrs}: m.CVnode<ViewAttrs>) {
    return m(DetailsBlock, {
      firstRow: m(Badge, {icon: registerIcon, backgroundColor: '#c58d38'}),
      secondRow: {
        text: t.__('Register Address Transaction'),
        date: attrs.transaction.confirmedAt
      },
      thirdRow: {
        label: t.__('Registered'),
        amount: '0',
      },
      id: attrs.transaction.id,
      details: m('div', 'register address details'),
    })
  }
}
