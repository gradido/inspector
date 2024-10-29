import { Type } from 'class-transformer'
import { TransferAmount } from './TransferAmount'

export class GradidoCreation {
  @Type(() => TransferAmount)
  public recipient: TransferAmount
  public targetDate: Date

  public constructor(recipient: TransferAmount, targetDate: Date) {
    this.recipient = recipient
    this.targetDate = targetDate
  }
}