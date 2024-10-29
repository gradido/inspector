import { ConfirmedTransaction } from "./ConfirmedTransaction"

export class TransactionExcerpt {
  id: string
  confirmedAt: Date
  amount: string
  createdAt: Date
  transactionType: string
  details: string
  isOpen: boolean // Neu hinzugefügt

  constructor(transaction: ConfirmedTransaction) {
    const gradidoTransaction = transaction.gradidoTransaction
    this.id = transaction.id
    this.confirmedAt = transaction.confirmedAt
    this.amount = gradidoTransaction.body.getAmount()
    this.createdAt = gradidoTransaction.body.createdAt
    this.transactionType = gradidoTransaction.body.getTransactionType()
    this.details = 
      JSON.stringify(transaction, null, 2)
          .replace(/\n/g, '<br/>')
          .replace(/ /g, '&nbsp;')
    this.isOpen = false
  }
   
}