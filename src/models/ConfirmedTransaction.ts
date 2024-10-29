import 'reflect-metadata'
import { Type } from 'class-transformer'
import { GradidoTransaction } from './GradidoTransaction'

export class ConfirmedTransaction {
  id: string
  @Type(() => GradidoTransaction)
  gradidoTransaction: GradidoTransaction
  confirmedAt: Date
  versionNumber: string
  runningHash: string | undefined
  messageId: string
  accountBalance: string = ''

  public constructor(
    id: string,
    gradidoTransaction: GradidoTransaction,
    confirmedAt: Date,
    versionNumber: string,
    messageId: string,
  ) {
    this.id = id
    this.gradidoTransaction = gradidoTransaction
    this.confirmedAt = confirmedAt
    this.versionNumber = versionNumber
    this.messageId = messageId
  }
}