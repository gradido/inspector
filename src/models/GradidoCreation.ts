import { TimestampSeconds } from './TimestampSeconds'
import { TransferAmount } from './TransferAmount'

export class GradidoCreation {
  public recipient: TransferAmount
  public targetDate: TimestampSeconds

  public constructor(recipient: TransferAmount, targetDate: TimestampSeconds) {
    this.recipient = recipient
    this.targetDate = targetDate
  }
}