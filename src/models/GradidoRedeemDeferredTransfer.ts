import { Type } from 'class-transformer'
import { GradidoTransfer } from './GradidoTransfer'

export class GradidoRedeemDeferredTransfer {
  deferredTransferTransactionNr: number
  @Type(() => GradidoTransfer)
  transfer: GradidoTransfer

  public constructor(deferredTransferTransactionNr: number, transfer: GradidoTransfer) {
    this.deferredTransferTransactionNr = deferredTransferTransactionNr
    this.transfer = transfer
  }

}