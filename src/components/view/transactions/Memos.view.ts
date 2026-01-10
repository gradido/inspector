import m from 'mithril'
import { getMemoKeyTypeString } from '../../../enum/MemoKeyType'
import type { EncryptedMemo } from '../../../schemas/basic.schema'
import { CopyToClipboardLink } from '../CopyToClipboardLink'

interface ViewAttrs {
  memos: EncryptedMemo[]
}

export class MemosView implements m.ClassComponent<ViewAttrs> {
  view({ attrs }: m.CVnode<ViewAttrs>) {
    return [
      attrs.memos.map((memo) => [
        m('.row', [
          m('.col', t.__('Memo Encryption Type')),
          m('.col.fw-bold.text-end', getMemoKeyTypeString(memo.type)),
        ]),
        m('.row', [
          m('.col', t.__('Encrypted Memo')),
          m(
            '.col.text-end.text-nowrap',
            m(CopyToClipboardLink, {
              data: memo.memo,
              name: t.__('Encrypted Memo'),
              maxLength: 64,
            }),
          ),
        ]),
        m('.row.pb-2'),
      ]),
    ]
  }
}
