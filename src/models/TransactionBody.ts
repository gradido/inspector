import { Type } from 'class-transformer'
import { CommunityRoot } from './CommunityRoot'
import { GradidoCreation } from './GradidoCreation'
import { GradidoTransfer } from './GradidoTransfer'
import { RegisterAddress } from './RegisterAddress'
import { GradidoDeferredTransfer } from './GradidoDeferredTransfer'
import { GradidoRedeemDeferredTransfer } from './GradidoRedeemDeferredTransfer'
import { GradidoTimeoutDeferredTransfer } from './GradidoTimeoutDeferredTransfer'

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
  @Type(() => GradidoRedeemDeferredTransfer)
  redeemDeferredTransfer: GradidoRedeemDeferredTransfer | undefined
  @Type(() => GradidoTimeoutDeferredTransfer)
  timeoutDeferredTransfer: GradidoTimeoutDeferredTransfer | undefined

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
  isRedeemDeferredTransfer(): boolean {
    return this.redeemDeferredTransfer !== undefined
  }
  isTimeoutDeferredTransfer(): boolean {
    return this.timeoutDeferredTransfer !== undefined
  }

  getTransactionType(): string {
    if(this.isCommunityRoot()) {
      return t.__("Community Root Transaction")
    } else if(this.isRegisterAddress()) {
      return t.__("Register Address Transaction")
    } else if(this.isCreation()) {
      return t.__("Contribution Transaction")
    } else if(this.isTransfer()) {
      return t.__("Transfer Transaction")
    } else if(this.isDeferredTransfer()) {
      return t.__("Deferred Transfer")
    } else if(this.isRedeemDeferredTransfer()) {
      return t.__("Redeem Deferred Transfer")
    } else if(this.isTimeoutDeferredTransfer()) {
      return t.__("Timeout Deferred Transfer")
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
    } else if(this.redeemDeferredTransfer) {
      return this.redeemDeferredTransfer.transfer.sender.amount
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