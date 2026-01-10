/// return first name and last name connected with a space

import type { LinkedUser } from '../schemas/basic.schema'

/// or if at least one of them is empty return pubkey
export function getUsername(linkedUser: LinkedUser): string {
  if (linkedUser.firstName.length && linkedUser.lastName.length) {
    return `${linkedUser.firstName} ${linkedUser.lastName}`
  } else {
    return getShortenPubkey(linkedUser)
  }
}
export function getShortenPubkey(linkedUser: LinkedUser): string {
  return `${linkedUser.pubkey.substring(0, 20)}...`
}
/// return initials of user if first and last name not empty,
/// else take first and last character from public key
export function getInitials(linkedUser: LinkedUser): string {
  let result = ''
  if (linkedUser.firstName.length) {
    result += linkedUser.firstName.charAt(0)
  }
  if (linkedUser.lastName.length) {
    result += linkedUser.lastName.charAt(0)
  }
  if (result.length !== 2 && linkedUser.pubkey.length) {
    result = linkedUser.pubkey.charAt(0) + linkedUser.pubkey.charAt(linkedUser.pubkey.length - 1)
  }
  return result
}
