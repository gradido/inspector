import { Exclude, Transform, Type } from 'class-transformer'
import { Decay } from "./Decay"
import { TransactionType } from '../enum/TransactionType'
import { LinkedUser } from './LinkedUser'

export class Transaction {
  amount: string 
  balance: string
  previousBalance: string
  balanceDate: string
  @Type(() => Decay)
  decay: Decay
  id: number
  @Type(() => LinkedUser)
  linkedUser: LinkedUser
  memo: string
  typeId: string

  constructor(
    amount: string, 
    balance: string, 
    previousBalance: string,
    balanceDate: string, 
    decay: Decay, 
    id: number, 
    linkedUser: LinkedUser,
    memo: string,
    typeId: string) {
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