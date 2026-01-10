export enum BalanceDerivationType {
  UNSPECIFIED = 'UNSPECIFIED',
  NODE = 'NODE',
  EXTERN = 'EXTERN',
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