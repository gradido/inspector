import m from 'mithril'
import { Droplet } from '../svg/Droplet'
import { formatDistance, formatGDD } from '../../utils/utils'
import { getUserTransactionTypeLabel } from '../../enum/UserTransactionType'
import { WalletTransaction } from '../../client/output.schema'

export class DecayDetails implements m.ClassComponent<WalletTransaction> {
  view({attrs}: m.CVnode<WalletTransaction>) {
    if(attrs.decay) {
      const userLocale = localStorage.getItem('language') ?? 'en'
      return [
        m('.mb-3', [
        m(Droplet, { classes: ['me-2']}),
        m('b', t.__('Calculation of Decay'))
      ]),
      m('.row',
        m('.col', [
          m('.row', [
              m('.col-sm-6.col-md-6.col-lg-4.col-6', t.__('Last Transaction')),
              m('.offset-0.col.offset-0.text-end.me-0', 
                new Intl.DateTimeFormat(
                  userLocale, 
                  {dateStyle: 'long', timeStyle: 'short', }
                ).format(new Date(attrs.decay.start))
              )
          ]),
          m('.row', [
            m('.col-sm-6.col-md-6.col-lg-4.col-6', t.__('Time passed')),
            m('.offset-0.col.offset-0.text-end.me-0', 
              // attrs.decay.end + ' ' + attrs.decay.start,
              formatDistance(new Date(attrs.decay.end), new Date(attrs.decay.start))
            )
          ]),
          m('.row.mt-2', [
            m('.col-sm-6.col-md-6.col-lg-4.col-6', t.__('Previous balance')),
            m('.offset-0.col.offset-0.text-end.me-0', formatGDD(attrs.previousBalance))
          ]),
          m('.row.mt-0', [
            m('.col-sm-6.col-md-6.col-lg-3.col-6', t.__('Decay')),
            m('.offset-0.col.offset-0.text-end.me-0', formatGDD(attrs.decay.decay))
          ]),
          m('.row.mb-2', [
            m('.col-sm-6.col-md-6.col-lg-3.col-6', getUserTransactionTypeLabel(attrs.typeId)),
            m('.offset-0.col.offset-0.text-end.me-0', formatGDD(attrs.amount))
          ]),
          m('.row.border-top.pt-2', [
            m('.col-sm-6.col-md-6.col-lg-3.col-6', t.__('New balance')),
            m('.offset-0.col.offset-0.text-end.me-0', m('b', formatGDD(attrs.balance)))
          ])
        ])
      )]
    } else {
      return m('.mt-3.mb-3.text-center', m('b', t.__('This transaction does not include decay.')))
    }
  }
}