import m from 'mithril'
import { WalletTransaction } from '../../client/output.schema'
import { DecayDetails } from './DecayDetails'

export class TransferDetails implements m.ClassComponent<WalletTransaction> {
  view({attrs}: m.CVnode<WalletTransaction>) {
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