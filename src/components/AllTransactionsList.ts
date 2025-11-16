import m from 'mithril'
import { DetailsBlock } from './view/DetailsBlock'
import { ConfirmedTransaction } from '../schemas/transaction.schema'
import { getTransactionType, getTransactionTypeString, TransactionType } from '../enum/TransactionType'
import boxesIcon from '~icons/bi/boxes'
import giftIcon from '~icons/bi/gift'
import transferIcon from '~icons/bi/cash-stack'
import friendsIcon from '~icons/bi/bezier2'
import registerIcon from '~icons/bi/card-checklist'
import timeoutIcon from '~icons/bi/clock-history'
import deferredIcon from '~icons/bi/clock'
import link45degIcon from '~icons/bi/link-45deg'
import { getAmount } from '../models/transactionBody'
import { Badge } from './view/bootstrap/Badge'

interface Attrs {
    transactions: ConfirmedTransaction[]
}

export class AllTransactionsList implements m.ClassComponent<Attrs> {  
  symbolForTransactionType(transactionType: TransactionType) : m.Child {
    switch(transactionType) {
      case TransactionType.CREATION: 
        return m(Badge, {icon: giftIcon, backgroundColor: 'RGBA(var(--bs-success-rgb),var(--bs-bg-opacity,1))'})
      case TransactionType.TRANSFER: 
        return m(Badge, {icon: transferIcon, backgroundColor: '#5e72e4'})
      case TransactionType.COMMUNITY_FRIENDS_UPDATE: 
        return m(Badge, {icon: friendsIcon, backgroundColor: '#c58d38'})
      case TransactionType.REGISTER_ADDRESS: 
        return m(Badge, {icon: registerIcon, backgroundColor: '#c58d38'})
      case TransactionType.DEFERRED_TRANSFER: 
        return m(Badge, {icon: deferredIcon, backgroundColor: 'RGBA(var(--bs-secondary-rgb),var(--bs-bg-opacity,1))'})
      case TransactionType.COMMUNITY_ROOT: 
        return m(Badge, {icon: boxesIcon, backgroundColor: 'RGBA(var(--bs-primary-rgb),var(--bs-bg-opacity,1))'})
      case TransactionType.REDEEM_DEFERRED_TRANSFER: 
        return m(Badge, {icon: transferIcon, backgroundColor: '#8965e0'})
      case TransactionType.TIMEOUT_DEFERRED_TRANSFER: 
        return m(Badge, {icon: timeoutIcon, backgroundColor: 'red'})
      default: throw new Error(t.__('Invalid Transaction Type, Please contact support'))
    }
  }

  thirdRowForTransaction(transaction: ConfirmedTransaction) {
    const transactionType = getTransactionType(transaction.gradidoTransaction.bodyBytes)
    const body = transaction.gradidoTransaction.bodyBytes
    switch(transactionType) {
      case TransactionType.CREATION: return {
        label: t.__('Created'),
        amount: getAmount(body)
      }
      case TransactionType.TRANSFER: return {
        label: t.__('Transferred'),
        amount: getAmount(body)
      }
      case TransactionType.COMMUNITY_FRIENDS_UPDATE: return {
        label: t.__('Friends Updated'),
        amount: '0'
      }
      case TransactionType.REGISTER_ADDRESS: return {
        label: t.__('Registered'),
        amount: '0'
      }
      case TransactionType.DEFERRED_TRANSFER: return {
        label: t.__('Charged'),
        amount: getAmount(body),
        sub: {
          label: t.__('via Link'),
          icon: m.trust(link45degIcon)
        }
      }
      case TransactionType.COMMUNITY_ROOT: return {
        label: t.__('Community Root'),
        amount: '0'
      }
      case TransactionType.REDEEM_DEFERRED_TRANSFER: return {
        label: t.__('Transferred'),
        amount: getAmount(body),
        sub: {
          label: t.__('via Link'),
          icon: m.trust(link45degIcon)
        }
      }
      case TransactionType.TIMEOUT_DEFERRED_TRANSFER: return {
        label: t.__('Received Back'),
        amount: getAmount(body),
        sub: {
          label: t.__('via Link'),
          icon: m.trust(link45degIcon)
        }
      }
      default: throw new Error(t.__('Invalid Transaction Type, Please contact support'))
    }
  }

  detailsForTransaction(transaction: ConfirmedTransaction): m.Child {
    const transactionType = getTransactionType(transaction.gradidoTransaction.bodyBytes)
    switch(transactionType) {
      case TransactionType.CREATION: return m('span', 'creation')
      case TransactionType.TRANSFER: return m('span', 'transfer')
      case TransactionType.COMMUNITY_FRIENDS_UPDATE: return m('span', 'community friends update')
      case TransactionType.REGISTER_ADDRESS: return m('span', 'register address')
      case TransactionType.DEFERRED_TRANSFER: return m('span', 'deferred transfer')
      case TransactionType.COMMUNITY_ROOT: return m('span', 'community root')
      case TransactionType.REDEEM_DEFERRED_TRANSFER: return m('span', 'redeem deferred transfer')
      case TransactionType.TIMEOUT_DEFERRED_TRANSFER: return m('span', 'timeout deferred transfer')
      default: throw new Error(t.__('Invalid Transaction Type, Please contact support'))
    }
  }

  view({attrs: {transactions}} : m.CVnode<Attrs>) {
    return transactions.map((transaction) => {
      const transactionType = getTransactionType(transaction.gradidoTransaction.bodyBytes)
        return m(DetailsBlock, {
          firstRow: m('span', {style: {width: '42px',height: '42px'} }, this.symbolForTransactionType(transactionType)),
          secondRow: {
            text: getTransactionTypeString(transactionType),
            date: transaction.confirmedAt
          },
          thirdRow: this.thirdRowForTransaction(transaction),
          id: transaction.id,
          details: this.detailsForTransaction(transaction),
        })
    })
  }
}
