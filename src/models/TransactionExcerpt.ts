import { ConfirmedTransaction } from '../schemas/transaction.schema'
import { getAmount } from './transactionBody'
import { getTransactionTypeString, getTransactionType } from '../enum/TransactionType'

export class TransactionExcerpt {
  id: number
  confirmedAt: Date
  amount: number
  createdAt: Date
  transactionType: string
  details: string
  isOpen: boolean // Neu hinzugefügt

  constructor(transaction: ConfirmedTransaction) {
    const gradidoTransaction = transaction.gradidoTransaction
    this.id = transaction.id
    this.confirmedAt = transaction.confirmedAt
    const amountString = getAmount(gradidoTransaction.bodyBytes)
    this.amount = parseFloat(amountString)
    this.createdAt = gradidoTransaction.bodyBytes.createdAt
    this.transactionType = getTransactionTypeString(getTransactionType(gradidoTransaction.bodyBytes))
    this.details = 
      JSON.stringify(transaction, null, 2)
          .replace(/\n/g, '<br/>')
          .replace(/ /g, '&nbsp;')
    this.isOpen = false
  }
   
}