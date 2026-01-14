import m from 'mithril'
import { getTransactionType, TransactionType } from '../../../enum/TransactionType'
import type { ConfirmedTransaction } from '../../../schemas/transaction.schema'
import { CommunityFriendsUpdateView } from './CommunityFriendsUpdate.view'
import { CommunityRootView } from './CommunityRoot.view'
import { DeferredTransferView } from './DeferredTransfer.view'
import { GradidoCreationView } from './GradidoCreation.view'
import { GradidoTransferView } from './GradidoTransfer.view'
import { RedeemDeferredTransferView } from './RedeemDeferredTransfer.view'
import { RegisterAddressView } from './RegisterAddress.view'
import { TimeoutDeferredTransferView } from './TimeoutDeferredTransfer.view'
import { ViewAttrs } from './viewAttrs'

export class TransactionView implements m.ClassComponent<ViewAttrs> {
  view({ attrs }: m.CVnode<ViewAttrs>) {
    const transactionType = getTransactionType(attrs.transaction.gradidoTransaction.bodyBytes)
    switch (transactionType) {
      case TransactionType.CREATION:
        return m(GradidoCreationView, attrs)
      case TransactionType.TRANSFER:
        return m(GradidoTransferView, attrs)
      case TransactionType.COMMUNITY_FRIENDS_UPDATE:
        return m(CommunityFriendsUpdateView, attrs)
      case TransactionType.REGISTER_ADDRESS:
        return m(RegisterAddressView, attrs)
      case TransactionType.DEFERRED_TRANSFER:
        return m(DeferredTransferView, attrs)
      case TransactionType.COMMUNITY_ROOT:
        return m(CommunityRootView, attrs)
      case TransactionType.REDEEM_DEFERRED_TRANSFER:
        return m(RedeemDeferredTransferView, attrs)
      case TransactionType.TIMEOUT_DEFERRED_TRANSFER:
        return m(TimeoutDeferredTransferView, attrs)
      default:
        throw new Error(t.__('Invalid Transaction Type, Please contact support'))
    }
  }
}
