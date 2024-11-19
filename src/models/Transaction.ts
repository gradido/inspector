import { Exclude, Transform, Type } from 'class-transformer'
import { Decay } from "./Decay"
import { TransactionType } from '../enum/TransactionType'
import { LinkedUser } from './LinkedUser'

export class Transaction {
  amount: string 
  balance: string
  previousBalance: string
  balanceDate: Date
  @Type(() => Decay)
  decay: Decay
  id: number
  @Type(() => LinkedUser)
  linkedUser: LinkedUser
  memo: string
  @Exclude()
  @Transform(({ value }) => {
    return TransactionType[value as keyof typeof TransactionType]
  })
  typeId: TransactionType

  constructor(
    amount: string, 
    balance: string, 
    previousBalance: string,
    balanceDate: Date, 
    decay: Decay, 
    id: number, 
    linkedUser: LinkedUser,
    memo: string,
    typeId: TransactionType) {
      this.amount = amount
      this.balance = balance
      this.previousBalance = previousBalance
      this.balanceDate = balanceDate
      this.decay = decay
      this.id = id
      this.linkedUser = linkedUser
      this.memo = memo
      this.typeId = typeId
  }
}