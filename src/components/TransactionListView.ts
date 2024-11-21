import m from 'mithril'
import { TransactionList } from '../models/TransactionList'
import { WalletSum } from './WalletSum'
import { Collapse } from './bootstrap/Collapse'
import { Decay } from './TransactionTypes/Decay'
import { DecayDetailsShort } from './TransactionTypes/DecayDetailsShort'
import { Transaction } from '../models/Transaction'
import { Transfer } from './TransactionTypes/Transfer'
import { combineElementWithClasses } from '../utils/utils'
import { DecayDetails } from './TransactionTypes/DecayDetails'
import { TransferDetails } from './TransactionTypes/TransferDetails'

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

  chooseTransactionTypeView(transaction: Transaction): m.Child {
    const containerClasses = ['pointer', 'mb-3', 'bg-white', 'app-box-shadow', 'gradido-border-radius', 'p-3']
    switch(transaction.typeId) {
      case 'DECAY': 
        return m(Collapse, {
          info: (isOpen) => m(Decay, { isOpen }),
          details: m(DecayDetailsShort, transaction),
          containerClasses,
          detailClasses: ['pb-4', 'pt-5']
        })
      case 'SEND':
      case 'RECEIVE':
      case 'CREATE':
      case 'LINK_SEND':
      case 'LINK_RECEIVE':
      case 'LINK_DELETE':
        return m(Collapse, {
          info: (isOpen) => m(Transfer, { isOpen, transaction }),
          details: m(TransferDetails, transaction),
          containerClasses,
          detailClasses: ['px-1']
        })
       // return m(combineElementWithClasses('', containerClasses), m(Transfer, { isOpen: false, transaction }))
      default: 
        return m('', transaction.typeId.toString())
    }
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
          m('.list-group.transactions-list',
            transactionList.transactions.length === 0 ? 
            m('.mt-4.text-center', t.__('You don\'t have any transactions on your account yet.'))
            : transactionList.transactions.map((transaction) => this.chooseTransactionTypeView(transaction))
          )
        )
      )
    ])
  }
}
