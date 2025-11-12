export enum SearchType {
  PUBLIC_KEY_HEX,
  TRANSACTION_NR,
  HIERO_TRANSACTION_ID,
  UNKNOWN
}

export const searchTypeToString = (searchType: SearchType) => {
  switch(searchType) {
    case SearchType.PUBLIC_KEY_HEX:
      return t.__('Public Key')
    case SearchType.TRANSACTION_NR:
      return t.__('Transaction Number')
    case SearchType.HIERO_TRANSACTION_ID:
      return t.__('Hiero Transaction ID')
    case SearchType.UNKNOWN:
      return t.__('Unknown')
  }
}
