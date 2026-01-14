import m from 'mithril'
import dropletHalfIcon from '~icons/bi/droplet-half'
import type { WalletTransaction } from '../../client/output.schema'
import { getUserTransactionTypeLabel } from '../../enum/UserTransactionType'
import { formatDistance, formatGDD } from '../../utils/utils'
import { DecayType } from '../../enum/DecayType'

export class DecayDetails implements m.ClassComponent<WalletTransaction> {

  viewTitle(attrs: WalletTransaction) {
    if (attrs.decay) {
      if (attrs.decay.type === DecayType.AFTER_START_BLOCK) {
        return m('.mb-3', [
          m('span.me-2', m.trust(dropletHalfIcon)),
          m('b', t.__('Calculation of Decay')),
        ])
      } else if (attrs.decay.type === DecayType.START_BLOCK_INSIDE) {
        return m('.mb-3', [
          m('span.me-2', m.trust(dropletHalfIcon)),
          m('b', t.__('Starting Block Decay')),
        ])
      }
    }
    return m('.mb-3', m('b', t.__('This transaction does not include decay.')))
  }

  viewDateTime(attrs: WalletTransaction) {
    if (!attrs.decay || attrs.decay.type === DecayType.BEFORE_START_BLOCK) return undefined
    const userLocale = localStorage.getItem('language') ?? 'en'
    return [
      m('.row', [
        m('.col-sm-10.col-md-8.col-lg-6.col-8', 
          attrs.decay.type === DecayType.START_BLOCK_INSIDE ? t.__('Decay was introduced on') : t.__('Last Transaction')),
        m('.offset-0.col.offset-0.text-end.me-0',
          new Intl.DateTimeFormat(userLocale, {
            dateStyle: 'long',
            timeStyle: 'short',
          }).format(new Date(attrs.decay.start)),
        ),
      ]),
      m('.row', [
        m('.col-sm-6.col-md-6.col-lg-4.col-6', t.__('Time passed')),
        m('.offset-0.col.offset-0.text-end.me-0',
          // attrs.decay.end + ' ' + attrs.decay.start,
          formatDistance(new Date(attrs.decay.end), new Date(attrs.decay.start)),
        ),
      ])
    ]
  }

  viewDecay(attrs: WalletTransaction) {
    return attrs.decay && attrs.decay.type !== DecayType.BEFORE_START_BLOCK
      ? m('.row.mt-0', [
          m('.col-sm-6.col-md-6.col-lg-3.col-6', t.__('Decay')),
          m('.offset-0.col.offset-0.text-end.me-0', formatGDD(attrs.decay.decay)),
        ])
      : undefined
  }

  view({ attrs }: m.CVnode<WalletTransaction>) {
    return [
      this.viewTitle(attrs),
      this.viewDateTime(attrs),
      m('.row.mt-2', [
        m('.col-sm-6.col-md-6.col-lg-4.col-6', t.__('Previous balance')),
        m('.offset-0.col.offset-0.text-end.me-0', formatGDD(attrs.previousBalance)),
      ]),
      this.viewDecay(attrs),
      m('.row', [
        m('.col-sm-6.col-md-6.col-lg-3.col-6', getUserTransactionTypeLabel(attrs.typeId)),
        m('.offset-0.col.offset-0.text-end.me-0', formatGDD(attrs.amount)),
      ]),
      attrs.change
        ? m('.row.mt-0', [
            m('.col-sm-6.col-md-6.col-lg-4.col-6', t.__('Change')),
            m('.offset-0.col.offset-0.text-end.me-0', formatGDD(attrs.change.amount)),
          ])
        : undefined,
      m('.row.border-top.pt-2.mt-2', [
        m('.col-sm-6.col-md-6.col-lg-3.col-6', t.__('New balance')),
        m('.offset-0.col.offset-0.text-end.me-0', m('b', formatGDD(attrs.balance))),
      ]),
    ]
  }
}
