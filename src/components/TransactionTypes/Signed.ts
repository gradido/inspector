import m from 'mithril'
import { Transaction } from '../../models/Transaction'

export class Signed implements m.ClassComponent<Transaction> {
  view({attrs}: m.CVnode<Transaction>) {
    // console.log(attrs.)
    return m('', t.__('Signed...'))
  }
}