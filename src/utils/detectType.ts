import { SearchType } from '../enum/SearchType'

export function detectSearchType(input: string): SearchType {
  if (!isNaN(Number(input))) {
    return SearchType.TRANSACTION_NR
  }
  if (/^0x[0-9A-Fa-f]+$/.test(input)) {
    return SearchType.PUBLIC_KEY_HEX
  }
  return SearchType.UNKNOWN
}