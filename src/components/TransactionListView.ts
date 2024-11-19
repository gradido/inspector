import m from 'mithril'
import { TransactionList } from '../models/TransactionList'
import { WalletSum } from './WalletSum'
import { Collapse } from './bootstrap/Collapse'
import { Decay } from './TransactionTypes/Decay'
import { DecayDetailsShort } from './TransactionTypes/DecayDetailsShort'

interface Attrs {
  transactionList: TransactionList
}

interface State {
    transactionsShowDetailState: boolean[]
}

export class TransactionListView implements m.ClassComponent<Attrs> {
  state: State
  constructor() {
    this.state = { transactionsShowDetailState: [] }    
  }

  oninit({attrs}: m.CVnode<Attrs>) {
    attrs.transactionList.transactions.map((_value, index) => 
      this.state.transactionsShowDetailState[index] = false
    )
  }

  view({attrs: {transactionList}}: m.CVnode<Attrs>) {
    return m('.row.px-lg3', [
      m('.col-12', 
        m('.row.row-cols-12.d-lg-flex', 
          m('.col', 
            m('.row', [
              m(WalletSum, {amount: transactionList.balance, name: 'GDD', active: true}),
              m(WalletSum, {amount: transactionList.balanceGDT, name: 'GDT', active: false}),
            ])
          )
        )
      ),
      m('.col-12', 
        m('.main-content.mt-lg-3.mt-0', 
          m('.list-group', [
            m(Collapse, {
              info: (isOpen) => m(Decay, { isOpen }),
              details: m(DecayDetailsShort, transactionList.transactions[0]),
              containerClasses: ['pointer', 'bg-white', 'app-box-shadow', 'gradido-border-radius', 'px-4', 'pt-2'],
              detailClasses: ['pb-4', 'pt-5']
            })
          ])
        )
      )
    ])
  }
}
