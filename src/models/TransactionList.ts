import { Type } from 'class-transformer'
import { Transaction } from './Transaction'

export class TransactionList {
  balance: string
  balanceGDT: string
  count: number
  linkCount: number
  addressType: string
  @Type(() => Transaction)
  transactions: Transaction[]

  constructor(balance: string, balanceGDT: string, count: number, linkCount: number, addressType: string, transactions: Transaction[]) {
    this.balance = balance
    this.balanceGDT = balanceGDT
    this.count = count
    this.linkCount = linkCount
    this.addressType = addressType
    this.transactions = transactions    
  }
   
}