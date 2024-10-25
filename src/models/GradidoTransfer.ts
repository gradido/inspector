import { Type } from 'class-transformer'
import { TransferAmount } from './TransferAmount'

export class GradidoTransfer {
  @Type(() => TransferAmount)
  sender: TransferAmount
  recipient: string

  public constructor(sender: TransferAmount, recipient: string) {
    this.sender = sender
    this.recipient = recipient
  }

}