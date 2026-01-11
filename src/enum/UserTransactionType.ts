export enum UserTransactionType {
  NONE = 'NONE',
  CREATE = 'CREATE',
  SEND = 'SEND',
  RECEIVE = 'RECEIVE',
  DECAY = 'DECAY',
  LINK_SEND = 'LINK_SEND',
  LINK_RECEIVE = 'LINK_RECEIVE',
  LINK_CHARGE = 'LINK_CHARGE',
  LINK_DELETE = 'LINK_DELETE',
  LINK_CHANGE = 'LINK_CHANGE',
  LINK_TIMEOUT = 'LINK_TIMEOUT',
}

export function userTransactionTypeFromString(
  typeId: string | UserTransactionType,
): UserTransactionType {
  return typeof typeId === 'string'
    ? UserTransactionType[typeId as keyof typeof UserTransactionType]
    : typeId
}

export function getUserTransactionTypeLabel(typeId: string | UserTransactionType): string {
  switch (userTransactionTypeFromString(typeId)) {
    case UserTransactionType.SEND:
    case UserTransactionType.LINK_SEND:
      return t.__('Sent')
    case UserTransactionType.RECEIVE:
    case UserTransactionType.LINK_RECEIVE:
      return t.__('Received')
    case UserTransactionType.LINK_DELETE:
      return t.__('Received Back')
    case UserTransactionType.LINK_CHANGE:
      return t.__('Received Change')
    case UserTransactionType.LINK_CHARGE:
      return t.__('Charged')
    case UserTransactionType.CREATE:
      return t.__('Created')
    case UserTransactionType.LINK_TIMEOUT:
      return t.__('Link Timeout')
    default:
      return t.__('Unknown')
  }
}

export function isUserTransactionTypeLink(typeId: string | UserTransactionType): boolean {
  return [
    UserTransactionType.LINK_RECEIVE,
    UserTransactionType.LINK_SEND,
    UserTransactionType.LINK_DELETE,
    UserTransactionType.LINK_CHANGE,
    UserTransactionType.LINK_TIMEOUT,
  ].includes(userTransactionTypeFromString(typeId))
}
