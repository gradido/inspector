export enum AddressType {
  NONE = 'NONE',
  COMMUNITY_AUF = 'COMMUNITY_AUF',
  COMMUNITY_GMW = 'COMMUNITY_GMW',
  COMMUNITY_HUMAN = 'COMMUNITY_HUMAN',
  COMMUNITY_PROJECT = 'COMMUNITY_PROJECT',
  CRYPTO_ACCOUNT = 'CRYPTO_ACCOUNT',
  SUBACCOUNT = 'SUBACCOUNT',
  DEFERRED_TRANSFER = 'DEFERRED_TRANSFER',
}

export function getAddressTypeString(type: AddressType): string {
  switch(type) {
    case AddressType.NONE: return t.__('None')
    case AddressType.COMMUNITY_AUF: return t.__('Community AUF')
    case AddressType.COMMUNITY_GMW: return t.__('Community GMW')
    case AddressType.COMMUNITY_HUMAN: return t.__('Community Human')
    case AddressType.COMMUNITY_PROJECT: return t.__('Community Project')
    case AddressType.CRYPTO_ACCOUNT: return t.__('Crypto Account')
    case AddressType.SUBACCOUNT: return t.__('Subaccount')
    case AddressType.DEFERRED_TRANSFER: return t.__('Deferred Transfer')
    default: return t.__('Unknown')
  }
}