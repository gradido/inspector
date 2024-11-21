import m from 'mithril'
import { Transaction } from '../../models/Transaction'
import { CollapseArrow } from '../CollapseArrow'
import { formatGDD } from '../../utils/utils'
import { Parcel } from '../svg/Parcel'
import { LinkedUser } from '../../models/LinkedUser'
import { Avatar } from '../Avatar'
import { Link } from '../svg/Link'
import { getTransactionTypeLabel, isTransactionTypeLink, TransactionType } from '../../enum/TransactionType'

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

  getClassesForAmount(typeId: string): string {
    switch(typeId) {
      case 'RECEIVE':
      case 'LINK_RECEIVE':
        return '.fw-bold.gradido-global-color-accent'
      default: return '.fw-bold'
    }
  }
  
  view({attrs: {transaction: {typeId, linkedUser, balanceDate, amount}, isOpen}}: m.CVnode<Attrs>) {
    const balanceDateObject = new Date(balanceDate)
    return m('.row.align-items-center', [
      m('.col-md-2.col-lg-2.col-3', this.getSymbol(typeId, linkedUser)),
      m('.col', [
        this.getLinkedUserName(linkedUser, typeId),
        m('span.small', balanceDateObject.toLocaleDateString()),
        m('span.ms-4.small', balanceDateObject.toLocaleTimeString())
      ]),
      m('.col-sm-8.col-md-3.col-lg-3.offset-3.offset-lg-0.offset-md-0.col-8.offset-3', [
        m('.small.mb-2', getTransactionTypeLabel(typeId)),
        m(this.getClassesForAmount(typeId), formatGDD(amount)),
        isTransactionTypeLink(typeId) ? m('.small', [
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
