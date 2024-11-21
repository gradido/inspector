import m from 'mithril'
import { Transaction } from '../../models/Transaction'
// import { Tabs } from '../bootstrap/Tabs'
import { DecayDetails } from './DecayDetails'
// import { Signed } from './Signed'

export class TransferDetails implements m.ClassComponent<Transaction> {
  view({attrs}: m.CVnode<Transaction>) {
    return [
      m('.word-break.mb-5.mt-lg-3', [
        m('.fw-bold.pb-2', t.__('Message')),
        m('', attrs.memo)
      ]),
      m(DecayDetails, attrs),
    ]
    /*
    return [
      m('.word-break.mb-5.mt-lg-3', [
        m('.fw-bold.pb-2', t.__('Message')),
        m('', attrs.memo)
      ]),
      m(Tabs, {
        itemTitles: [t.__('Decay'), t.__('Signed')], 
        children: [
          m(DecayDetails, attrs),
          m(Signed, attrs)
        ]})
    ]
    */
  }
}