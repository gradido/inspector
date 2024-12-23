import m from 'mithril'
import { Droplet } from '../svg/Droplet'
import { formatGDD } from '../../utils/utils'
import { Transaction } from '../../models/Transaction'

export class DecayDetailsShort implements m.ClassComponent<Transaction> {
  
  constructDecayString({ previousBalance, decay, balance }: Transaction): m.ChildArray {
    const formattedPrevious = formatGDD(previousBalance);
    const formattedDecay = decay.decay === '0' ? t.__('− ') : '' + formatGDD(decay.decay);
    const formattedBalance = formatGDD(balance);

    return [
      formattedPrevious,
      ' ',
      formattedDecay,
      ' ',
      t.__('='),
      ' ',
      m('b', formattedBalance),
    ];
  }

  view({attrs}: m.CVnode<Transaction>) {
    return [
      m('.mb-3.d-flex.align-items-center', [
        m(Droplet, { classes: ['me-2']}),
        m('b', t.__('Calculation of Decay'))
      ]),
      m('.row', 
        m('.col', 
          m('.row', [
              m('.col-md-4.col-lg-4.col-12', 
                m('', t.__('Decay'))
              ),
              m('.offset-1.offset-lg-0.offset-md-0.col', 
                m('', this.constructDecayString(attrs))
              )
            ])
          )
        )
    ]
  }
}