import { Expose, Type } from 'class-transformer'
import { SignatureMap } from './SignatureMap'
import { TransactionBody } from './TransactionBody'

export class GradidoTransaction {
  @Type(() => SignatureMap)
  public sigMap: SignatureMap
  @Expose({ name: 'bodyBytes' })
  @Type(() => TransactionBody)
  public body: TransactionBody

  public constructor(sigMap: SignatureMap, body: TransactionBody) {
    this.sigMap = sigMap
    this.body = body
  }
}