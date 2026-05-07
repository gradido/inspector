import m from 'mithril'
import dropletHalfIcon from '~icons/bi/droplet-half'
import type { WalletTransaction } from '../../client/output.schema'
import { FormattedCurrency } from '../view/FormattedCurrency'

export class DecayDetailsShort implements m.ClassComponent<WalletTransaction> {
  constructDecayString({ previousBalance, decay, balance }: WalletTransaction): m.ChildArray {
    const formattedPrevious = m(FormattedCurrency, { value: previousBalance })
    let formattedDecay: m.Child
    if (decay && decay.decay !== '0') {
      formattedDecay = m(FormattedCurrency, { value: decay.decay })
    } else {
      formattedDecay = t.__('− ')
    }
    const formattedBalance = m(FormattedCurrency, { value: balance })

    return [formattedPrevious, ' ', formattedDecay, ' ', t.__('='), ' ', m('b', formattedBalance)]
  }

  view({ attrs }: m.CVnode<WalletTransaction>) {
    return [
      m('.mb-3.d-flex.align-items-center', [
        m('span.me-2', m.trust(dropletHalfIcon)),
        m('b', t.__('Calculation of Decay')),
      ]),
      m(
        '.row',
        m(
          '.col',
          m('.row', [
            m('.col-md-4.col-lg-4.col-12', t.__('Decay')),
            m('.offset-1.offset-lg-0.offset-md-0.col', this.constructDecayString(attrs)),
          ]),
        ),
      ),
    ]
  }
}
