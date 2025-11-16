import { ConfirmedTransaction } from '../../../schemas/transaction.schema'

export interface ViewAttrs {
  transaction: ConfirmedTransaction
  communityId: string
}