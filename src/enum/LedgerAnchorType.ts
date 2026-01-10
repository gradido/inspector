export enum LedgerAnchorType {
  UNSPECIFIED = 'UNSPECIFIED',
  IOTA_MESSAGE_ID = 'IOTA_MESSAGE_ID',
  HIERO_TRANSACTION_ID = 'HIERO_TRANSACTION_ID',
  LEGACY_GRADIDO_DB_TRANSACTION_ID = 'LEGACY_GRADIDO_DB_TRANSACTION_ID',
  NODE_TRIGGER_TRANSACTION_ID = 'NODE_TRIGGER_TRANSACTION_ID',
  LEGACY_GRADIDO_DB_COMMUNITY_ID = 'LEGACY_GRADIDO_DB_COMMUNITY_ID',
  LEGACY_GRADIDO_DB_USER_ID = 'LEGACY_GRADIDO_DB_USER_ID',
  LEGACY_GRADIDO_DB_CONTRIBUTION_ID = 'LEGACY_GRADIDO_DB_CONTRIBUTION_ID',
  LEGACY_GRADIDO_DB_TRANSACTION_LINK_ID = 'LEGACY_GRADIDO_DB_TRANSACTION_LINK_ID',
}

export function getLedgerAnchorTypeString(type: LedgerAnchorType): string {
  switch (type) {
    case LedgerAnchorType.UNSPECIFIED:
      return t.__('Unspecified')
    case LedgerAnchorType.IOTA_MESSAGE_ID:
      return t.__('IOTA Message ID')
    case LedgerAnchorType.HIERO_TRANSACTION_ID:
      return t.__('Hiero Transaction ID')
    case LedgerAnchorType.LEGACY_GRADIDO_DB_TRANSACTION_ID:
      return t.__('DB Transaction ID')
    case LedgerAnchorType.NODE_TRIGGER_TRANSACTION_ID:
      return t.__('Node Trigger Transaction ID')
    case LedgerAnchorType.LEGACY_GRADIDO_DB_COMMUNITY_ID:
      return t.__('DB Community ID')
    case LedgerAnchorType.LEGACY_GRADIDO_DB_USER_ID:
      return t.__('DB User ID')
    case LedgerAnchorType.LEGACY_GRADIDO_DB_CONTRIBUTION_ID:
      return t.__('DB Contribution ID')
    case LedgerAnchorType.LEGACY_GRADIDO_DB_TRANSACTION_LINK_ID:
      return t.__('DB Transaction Link ID')
    default:
      return t.__('Unknown')
  }
}