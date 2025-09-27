import { SearchType } from '../enum/SearchType'
import { hieroTransactionIdRegex } from '../schemas/basic.schema'

export function detectSearchType(input: string): SearchType {
  if (!isNaN(Number(input))) {
    return SearchType.TRANSACTION_NR
  }
  if (/^[0-9A-Fa-f]+$/.test(input)) {
    return SearchType.PUBLIC_KEY_HEX
  }
  if (hieroTransactionIdRegex.test(input)) {
    return SearchType.HIERO_TRANSACTION_ID
  }
  return SearchType.UNKNOWN
}