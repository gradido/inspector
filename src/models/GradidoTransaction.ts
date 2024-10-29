import { Expose, Type } from 'class-transformer'
import { SignatureMap } from './SignatureMap'
import { TransactionBody } from './TransactionBody'

export class GradidoTransaction {
  @Type(() => SignatureMap)
  public signatureMap: SignatureMap
  @Expose({ name: 'bodyBytes' })
  @Type(() => TransactionBody)
  @Expose({ name: 'bodyBytes'})
  public body: TransactionBody

  public constructor(signatureMap: SignatureMap, body: TransactionBody) {
    this.signatureMap = signatureMap
    this.body = body
  }
}