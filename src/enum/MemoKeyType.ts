export enum MemoKeyType {
  SHARED_SECRET = 'GRDT_MEMO_KEY_SHARED_SECRET',
  COMMUNITY_SECRET = 'GRDT_MEMO_KEY_COMMUNITY_SECRET',
  PLAIN = 'GRDT_MEMO_KEY_PLAIN',
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
