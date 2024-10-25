import { Type } from 'class-transformer'
import { GradidoTransaction } from './GradidoTransaction'
import { TimestampSeconds } from './TimestampSeconds'

export class ConfirmedTransaction {
  id: string
  @Type(() => GradidoTransaction)
  transaction: GradidoTransaction
  @Type(() => TimestampSeconds)
  confirmedAt: TimestampSeconds
  versionNumber: string
  runningHash: string | undefined
  messageId: string
  accountBalance: string = ''

  public constructor(
    id: string,
    transaction: GradidoTransaction,
    confirmedAt: TimestampSeconds,
    versionNumber: string,
    messageId: string,
  ) {
    this.id = id
    this.transaction = transaction
    this.confirmedAt = confirmedAt
    this.versionNumber = versionNumber
    this.messageId = messageId
  }
}