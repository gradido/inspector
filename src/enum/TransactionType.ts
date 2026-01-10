import type { TransactionBody } from '../schemas/transaction.schema'

export enum TransactionType {
  //! Invalid or Empty Transaction
  NONE = 'NONE',
  //! Creation Transaction, creates new Gradidos
  CREATION = 'CREATION',
  //! Transfer Transaction, move Gradidos from one account to another
  TRANSFER = 'TRANSFER',
  //! Group Friends Update Transaction, update relationship between groups
  COMMUNITY_FRIENDS_UPDATE = 'COMMUNITY_FRIENDS_UPDATE',
  //! Register new address or sub address to group or move addres to another group
  REGISTER_ADDRESS = 'REGISTER_ADDRESS',
  //! Special Transfer Transaction with timeout used for Gradido Link
  DEFERRED_TRANSFER = 'DEFERRED_TRANSFER',
  //! First Transaction in Blockchain
  COMMUNITY_ROOT = 'COMMUNITY_ROOT',
  //! redeeming deferred transfer
  REDEEM_DEFERRED_TRANSFER = 'REDEEM_DEFERRED_TRANSFER',
  //! timeout deferred transfer, send back locked gdds
  TIMEOUT_DEFERRED_TRANSFER = 'TIMEOUT_DEFERRED_TRANSFER',
}

export function getTransactionType(body: TransactionBody): TransactionType {
  if (body.creation) {
    return TransactionType.CREATION
  } else if (body.transfer) {
    return TransactionType.TRANSFER
  } else if (body.registerAddress) {
    return TransactionType.REGISTER_ADDRESS
  } else if (body.deferredTransfer) {
    return TransactionType.DEFERRED_TRANSFER
  } else if (body.communityRoot) {
    return TransactionType.COMMUNITY_ROOT
  } else if (body.redeemDeferredTransfer) {
    return TransactionType.REDEEM_DEFERRED_TRANSFER
  } else if (body.timeoutDeferredTransfer) {
    return TransactionType.TIMEOUT_DEFERRED_TRANSFER
  }
  return TransactionType.NONE
}

export function getTransactionTypeString(type: TransactionType): string {
  switch (type) {
    case TransactionType.NONE:
      return t.__('None')
    case TransactionType.CREATION:
      return t.__('Contribution Transaction')
    case TransactionType.TRANSFER:
      return t.__('Transfer Transaction')
    case TransactionType.COMMUNITY_FRIENDS_UPDATE:
      return t.__('Community Friends Update')
    case TransactionType.REGISTER_ADDRESS:
      return t.__('Register Address Transaction')
    case TransactionType.DEFERRED_TRANSFER:
      return t.__('Deferred Transfer')
    case TransactionType.COMMUNITY_ROOT:
      return t.__('Community Root Transaction')
    case TransactionType.REDEEM_DEFERRED_TRANSFER:
      return t.__('Redeem Deferred Transfer')
    case TransactionType.TIMEOUT_DEFERRED_TRANSFER:
      return t.__('Timeout Deferred Transfer')
    default:
      return t.__('Unknown')
  }
}
