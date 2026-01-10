import m from 'mithril'
import { getTransactionType, TransactionType } from '../enum/TransactionType'
import type { ConfirmedTransaction } from '../schemas/transaction.schema'
import { CommunityFriendsUpdateView } from './view/transactions/CommunityFriendsUpdate.view'
import { CommunityRootView } from './view/transactions/CommunityRoot.view'
import { DeferredTransferView } from './view/transactions/DeferredTransfer.view'
import { GradidoCreationView } from './view/transactions/GradidoCreation.view'
import { GradidoTransferView } from './view/transactions/GradidoTransfer.view'
import { RedeemDeferredTransferView } from './view/transactions/RedeemDeferredTransfer.view'
import { RegisterAddressView } from './view/transactions/RegisterAddress.view'
import { TimeoutDeferredTransferView } from './view/transactions/TimeoutDeferredTransfer.view'

interface Attrs {
  transactions: ConfirmedTransaction[]
  communityId: string
}

export class AllTransactionsList implements m.ClassComponent<Attrs> {
  pickCorrectView(
    transactionType: TransactionType,
    confirmedTransaction: ConfirmedTransaction,
    communityId: string,
  ): m.Child {
    const viewAttrs = { transaction: confirmedTransaction, communityId }
    switch (transactionType) {
      case TransactionType.CREATION:
        return m(GradidoCreationView, viewAttrs)
      case TransactionType.TRANSFER:
        return m(GradidoTransferView, viewAttrs)
      case TransactionType.COMMUNITY_FRIENDS_UPDATE:
        return m(CommunityFriendsUpdateView, viewAttrs)
      case TransactionType.REGISTER_ADDRESS:
        return m(RegisterAddressView, viewAttrs)
      case TransactionType.DEFERRED_TRANSFER:
        return m(DeferredTransferView, viewAttrs)
      case TransactionType.COMMUNITY_ROOT:
        return m(CommunityRootView, viewAttrs)
      case TransactionType.REDEEM_DEFERRED_TRANSFER:
        return m(RedeemDeferredTransferView, viewAttrs)
      case TransactionType.TIMEOUT_DEFERRED_TRANSFER:
        return m(TimeoutDeferredTransferView, viewAttrs)
      default:
        throw new Error(t.__('Invalid Transaction Type, Please contact support'))
    }
  }

  view({ attrs: { transactions, communityId } }: m.CVnode<Attrs>) {
    return transactions.map((transaction) => {
      const transactionType = getTransactionType(transaction.gradidoTransaction.bodyBytes)
      return this.pickCorrectView(transactionType, transaction, communityId)
    })
  }
}
