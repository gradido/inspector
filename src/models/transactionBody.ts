import type { TransactionBody } from '../schemas/transaction.schema'

export function getAmount(body: TransactionBody): string {
  if (body.creation) {
    return body.creation.recipient.amount
  } else if (body.transfer) {
    return body.transfer.sender.amount
  } else if (body.deferredTransfer) {
    return body.deferredTransfer.transfer.sender.amount
  } else if (body.redeemDeferredTransfer) {
    return body.redeemDeferredTransfer.transfer.sender.amount
  }
  return '0'
}
