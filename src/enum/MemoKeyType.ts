export enum MemoKeyType {
  SHARED_SECRET = 'SHARED_SECRET',
  COMMUNITY_SECRET = 'COMMUNITY_SECRET',
  PLAIN = 'PLAIN',
}

export function getMemoKeyTypeString(type: MemoKeyType): string {
  switch (type) {
    case MemoKeyType.SHARED_SECRET:
      return t.__('Shared Secret')
    case MemoKeyType.COMMUNITY_SECRET:
      return t.__('Community Secret')
    case MemoKeyType.PLAIN:
      return t.__('Plain')
    default:
      return t.__('Unknown')
  }
}
