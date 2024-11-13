import { Type } from 'class-transformer'
import { GradidoTransfer } from './GradidoTransfer'

export class GradidoDeferredTransfer {
  @Type(() => GradidoTransfer)
  transfer: GradidoTransfer
  timeout: Date

  public constructor(transfer: GradidoTransfer, timeout: Date) {
    this.transfer = transfer
    this.timeout = timeout
  }

}