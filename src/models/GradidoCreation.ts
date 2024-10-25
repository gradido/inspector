import { Type } from 'class-transformer'
import { TimestampSeconds } from './TimestampSeconds'
import { TransferAmount } from './TransferAmount'

export class GradidoCreation {
  @Type(() => TransferAmount)
  public recipient: TransferAmount
  @Type(() => TimestampSeconds)
  public targetDate: TimestampSeconds

  public constructor(recipient: TransferAmount, targetDate: TimestampSeconds) {
    this.recipient = recipient
    this.targetDate = targetDate
  }
}