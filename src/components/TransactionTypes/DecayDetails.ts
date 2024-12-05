import m from 'mithril'
import { Droplet } from '../svg/Droplet'
import { formatGDD } from '../../utils/utils'
import { Transaction } from '../../models/Transaction'
//import { formatDistance } from 'date-fns'
//import { enUS as en, de, es, fr, nl } from 'date-fns/locale'
import { getTransactionTypeLabel } from '../../enum/TransactionType'

//const locales = { en, de, es, fr, nl }

export class DecayDetails implements m.ClassComponent<Transaction> {
  view({attrs}: m.CVnode<Transaction>) {
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
              attrs.decay.end + ' ' + attrs.decay.start)
              /*formatDistance(attrs.decay.end, attrs.decay.start, { 
                locale: locales[userLocale as keyof typeof locales] 
              }))*/
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
            m('.col-sm-6.col-md-6.col-lg-3.col-6', getTransactionTypeLabel(attrs.typeId)),
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