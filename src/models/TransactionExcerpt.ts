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
    this.id = transaction.id
    this.confirmedAt = transaction.confirmedAt.getDate()
    this.amount = transaction.transaction.body.getAmount()
    this.createdAt = transaction.transaction.body.createdAt.getDate()
    this.transactionType = transaction.transaction.body.getTransactionType()
    this.details = 
      JSON.stringify(transaction, null, 2)
          .replace(/\n/g, '<br/>')
          .replace(/ /g, '&nbsp;')
    this.isOpen = false
  }
   
}