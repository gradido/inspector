import m from 'mithril'
import { Transaction } from '../../models/Transaction'
import { CollapseArrow } from '../CollapseArrow'
import { formatGDD } from '../../utils/utils'
import { Parcel } from '../svg/Parcel'
import { LinkedUser } from '../../models/LinkedUser'
import { Avatar } from '../Avatar'
import { Link } from '../svg/Link'

interface Attrs {
  isOpen: boolean
  transaction: Transaction
}

export class Transfer implements m.ClassComponent<Attrs> {
  
  getSymbol(typeId: string, user: LinkedUser): m.Child {
    switch(typeId) {
      case 'CREATE': 
        return m('.b-avatar.text-bg-success.rounded-5.badge', {style: {width: '42px', height: '42px'}},
          m('span.b-avatar-custom', m(Parcel, {style: {'--31d77598': 'var(--bs-white)'}, classes: ['icon-variant']}))
        )
    }
    return m(Avatar, {user})
  }

  getTypeAction(typeId: string): string {
    switch(typeId) {
      case 'SEND': 
      case 'LINK_SEND':
        return t.__('Sent')
      case 'RECEIVE': 
      case 'LINK_RECEIVE':
        return t.__('Received')
      case 'LINK_DELETE':
        return t.__('Received Back')
      case 'CREATE': return t.__('Created')
      default: return t.__('Unknown')
    }
  }

  getLinkedUserName(user: LinkedUser, typeId: string): m.Child {
    if(typeId === 'CREATE') {
      return m('.name.fw-bold', t.__('Gradido Academie'))
    } else {
      return m('.name.fw-bold',
        m(
          'a', 
          {href: '#!/account/' + user.pubkey, title: user.pubkey}, 
          user.getShortenPubkey()
        )
      )
    }
  }
  isLink(typeId: string): boolean {
    return ['LINK_RECEIVE', 'LINK_SEND', 'LINK_DELETE'].includes(typeId)
  }
  
  view({attrs: {transaction, isOpen}}: m.CVnode<Attrs>) {
    const balanceDate = new Date(transaction.balanceDate)
    return m('.row.align-items-center', [
      m('.col-md-2.col-lg-2.col-3', this.getSymbol(transaction.typeId, transaction.linkedUser)),
      m('.col', [
        this.getLinkedUserName(transaction.linkedUser, transaction.typeId),
        m('span.small', balanceDate.toLocaleDateString()),
        m('span.ms-4.small', balanceDate.toLocaleTimeString())
      ]),
      m('.col-sm-8.col-md-3.col-lg-3.offset-3.offset-lg-0.offset-md-0.col-8.offset-3', [
        m('.small.mb-2', this.getTypeAction(transaction.typeId)),
        m('.fw-bold.text-140', formatGDD(transaction.amount)),
        this.isLink(transaction.typeId) ? m('.small', [
          m('span', t.__('via Link')),
          m(Link, {style: {'--31d77598': 'var(--bs-muted)'}, classes: ['icon-variant']})
        ])
        : undefined
      ]),
      m('.col-md-1.col-lg-1.col-12.text-end', 
        m('.collapse-icon.text-end', 
          m(CollapseArrow, { open: isOpen }))
      )
    ])
  }
}
