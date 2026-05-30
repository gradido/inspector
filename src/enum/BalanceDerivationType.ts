export enum BalanceDerivationType {
  UNSPECIFIED = 'GRDT_BALANCE_DERIVATION_UNSPECIFIED',
  NODE = 'GRDT_BALANCE_DERIVATION_NODE',
  EXTERN = 'GRDT_BALANCE_DERIVATION_EXTERN',
}

export function getBalanceDerivationTypeString(type: BalanceDerivationType): string {
  switch (type) {
    case BalanceDerivationType.UNSPECIFIED:
      return t.__('Unspecified')
    case BalanceDerivationType.NODE:
      return t.__('Node')
    case BalanceDerivationType.EXTERN:
      return t.__('Extern')
    default:
      return t.__('Unknown')
  }
}
