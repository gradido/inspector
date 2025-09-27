import m from 'mithril'
import { WalletTransaction } from '../../client/output.schema'
import { t } from '../../utils/i18n'

export class Signed implements m.ClassComponent<WalletTransaction> {
  view({attrs}: m.CVnode<WalletTransaction>) {
    // console.log(attrs.)
    return m('', t.__('Signed...'))
  }
}