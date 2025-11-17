import m from 'mithril'
import { Avatar } from '../view/Avatar'
import { getUserTransactionTypeLabel, isUserTransactionTypeLink, UserTransactionType } from '../../enum/UserTransactionType'
import { WalletTransaction } from '../../client/output.schema'
import { DetailsBlock } from '../view/DetailsBlock'
import giftIcon from '~icons/bi/gift' 
import link45degIcon from '~icons/bi/link-45deg'
import { TransferDetails } from './TransferDetails'

interface Attrs {
  transaction: WalletTransaction
  communityId: string
}

export class Transfer implements m.ClassComponent<Attrs> {
  
  getSymbol(transaction: WalletTransaction): m.Child {
    switch(transaction.typeId) {
      case UserTransactionType.CREATE: 
        return m(
          'span.b-avatar.rounded-5.badge', 
          { style: { width: '42px',height: '42px', backgroundColor: 'RGBA(var(--bs-success-rgb),var(--bs-bg-opacity,1))'} }, 
          m('span.b-avatar-custom', m.trust(giftIcon))
        )
    }
    return m(Avatar, {user: transaction.linkedUser})
  }

  getTitle(transaction: WalletTransaction, communityId: string) {
    const balanceDateObject = new Date(transaction.balanceDate)
    if(transaction.typeId === UserTransactionType.CREATE) {
      return {
        text: t.__('Gradido Academie'),
        date: balanceDateObject
      }
    } else {
      return {
        text: transaction.linkedUser.pubkey,
        link: `#!/account/${communityId}/${transaction.linkedUser.pubkey}`,
        date: balanceDateObject
      }
    }
  }
  
  view({attrs}: m.CVnode<Attrs>) {
    const {transaction, communityId} = attrs
    return m(DetailsBlock, {
      firstRow: this.getSymbol(transaction),
      secondRow: this.getTitle(transaction, communityId),
      thirdRow: {
        label: getUserTransactionTypeLabel(transaction.typeId),
        amount: transaction.amount,
        sub: isUserTransactionTypeLink(transaction.typeId) ? {
          label: t.__('via Link'),
          icon: m.trust(link45degIcon)
        } : undefined
      },
      details: m(TransferDetails, transaction),
      detailClasses: ['px-1'],
      id: transaction.id
    })
  }
}
