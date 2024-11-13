import { Type } from 'class-transformer'
import { CommunityRoot } from './CommunityRoot'
import { GradidoCreation } from './GradidoCreation'
import { GradidoTransfer } from './GradidoTransfer'
import { RegisterAddress } from './RegisterAddress'
import { GradidoDeferredTransfer } from './GradidoDeferredTransfer'

export class TransactionBody {
  memo: string
  createdAt: Date
  versionNumber: string
  type: string = 'LOCAL'
  otherGroup: string = ''

  @Type(() => CommunityRoot)
  communityRoot: CommunityRoot | undefined
  @Type(() => RegisterAddress)
  registerAddress: RegisterAddress | undefined
  @Type(() => GradidoCreation)
  creation: GradidoCreation | undefined
  @Type(() => GradidoTransfer)
  transfer: GradidoTransfer | undefined
  @Type(() => GradidoDeferredTransfer)
  deferredTransfer: GradidoDeferredTransfer | undefined

  parentMessageId: string = ''

  isCommunityRoot(): boolean {
    return this.communityRoot !== undefined
  }
  isRegisterAddress(): boolean {
    return this.registerAddress !== undefined
  }
  isCreation(): boolean {
    return this.creation !== undefined
  }
  isTransfer(): boolean {
    return this.transfer !== undefined
  }
  isDeferredTransfer(): boolean {
    return this.deferredTransfer !== undefined
  }

  getTransactionType(): string {
    if(this.isCommunityRoot()) {
      return "Community Root Transaction"
    } else if(this.isRegisterAddress()) {
      return "Register Address Transaction"
    } else if(this.isCreation()) {
      return "Contribution Transaction"
    } else if(this.isTransfer()) {
      return "Transfer Transaction"
    } else if(this.isDeferredTransfer()) {
      return "Deferred Transfer"
    }
    return "unknown"
  }

  getAmount(): string {
    if(this.creation) {
      return this.creation.recipient.amount
    } else if(this.transfer) {
      return this.transfer.sender.amount
    } else if(this.deferredTransfer) {
      return this.deferredTransfer.transfer.sender.amount
    }
    return '0'
  }

  public constructor(
    memo: string,
    createdAt: Date,
    versionNumber: string,
  ) {
    this.memo = memo
    this.createdAt = createdAt
    this.versionNumber = versionNumber
  }
}