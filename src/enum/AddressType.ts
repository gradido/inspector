export enum AddressType {
  NONE = 'GRDT_ADDRESS_NONE',
  COMMUNITY_AUF = 'GRDT_ADDRESS_COMMUNITY_AUF',
  COMMUNITY_GMW = 'GRDT_ADDRESS_COMMUNITY_GMW',
  COMMUNITY_HUMAN = 'GRDT_ADDRESS_COMMUNITY_HUMAN',
  COMMUNITY_PROJECT = 'GRDT_ADDRESS_COMMUNITY_PROJECT',
  CRYPTO_ACCOUNT = 'GRDT_ADDRESS_CRYPTO_ACCOUNT',
  SUBACCOUNT = 'GRDT_ADDRESS_SUBACCOUNT',
  DEFERRED_TRANSFER = 'GRDT_ADDRESS_DEFERRED_TRANSFER',
}

export function getAddressTypeString(type: AddressType): string {
  switch (type) {
    case AddressType.NONE:
      return t.__('None')
    case AddressType.COMMUNITY_AUF:
      return t.__('Community AUF')
    case AddressType.COMMUNITY_GMW:
      return t.__('Community GMW')
    case AddressType.COMMUNITY_HUMAN:
      return t.__('Community Human')
    case AddressType.COMMUNITY_PROJECT:
      return t.__('Community Project')
    case AddressType.CRYPTO_ACCOUNT:
      return t.__('Crypto Account')
    case AddressType.SUBACCOUNT:
      return t.__('Subaccount')
    case AddressType.DEFERRED_TRANSFER:
      return t.__('Deferred Transfer')
    default:
      return t.__('Unknown')
  }
}
