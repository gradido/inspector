export enum TransactionType {
  NONE,
  CREATE,
  SEND,
  RECEIVE,
  DECAY,
  LINK_SEND,
  LINK_RECEIVE,
  LINK_DELETE,
  LINK_CHANGE,
  LINK_CHARGE
}

export function transactionTypeFromString(typeId: string | TransactionType): TransactionType {
  return typeof typeId === 'string' ? TransactionType[typeId as keyof typeof TransactionType] : typeId
}

export function getTransactionTypeLabel(typeId: string | TransactionType): string {
  switch(transactionTypeFromString(typeId)) {
    case TransactionType.SEND: 
    case TransactionType.LINK_SEND:
      return t.__('Sent')
    case TransactionType.RECEIVE: 
    case TransactionType.LINK_RECEIVE:
      return t.__('Received')
    case TransactionType.LINK_DELETE:
      return t.__('Received Back')
    case TransactionType.LINK_CHANGE: 
      return t.__('Received Change')
    case TransactionType.LINK_CHARGE: 
      return t.__('Charged')
    case TransactionType.CREATE: 
      return t.__('Created')
    default: return t.__('Unknown')
  }
}

export function isTransactionTypeLink(typeId: string| TransactionType): boolean {
  return [
    TransactionType.LINK_RECEIVE, 
    TransactionType.LINK_SEND, 
    TransactionType.LINK_DELETE,
    TransactionType.LINK_CHANGE
  ].includes(transactionTypeFromString(typeId))
}