import m from 'mithril'
import { WalletSum } from './WalletSum'
import { Collapse } from './bootstrap/Collapse'
import { Decay } from './TransactionTypes/Decay'
import { DecayDetailsShort } from './TransactionTypes/DecayDetailsShort'
import { Transfer } from './TransactionTypes/Transfer'
import { TransferDetails } from './TransactionTypes/TransferDetails'
import { TransactionList, WalletTransaction } from '../client/output.schema'
import { UserTransactionType } from '../enum/UserTransactionType'

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

  chooseTransactionTypeView(transaction: WalletTransaction): m.Child {
    const containerClasses = ['pointer', 'mb-3', 'bg-white', 'app-box-shadow', 'gradido-border-radius', 'p-3']
    switch(transaction.typeId) {
      case UserTransactionType.DECAY: 
        return m(Collapse, {
          info: (isOpen) => m(Decay, { isOpen }),
          details: m(DecayDetailsShort, transaction),
          containerClasses,
          detailClasses: ['pb-4', 'pt-5']
        })
      case UserTransactionType.SEND:
      case UserTransactionType.RECEIVE:
      case UserTransactionType.CREATE:
      case UserTransactionType.LINK_SEND:
      case UserTransactionType.LINK_RECEIVE:
      case UserTransactionType.LINK_DELETE:
      case UserTransactionType.LINK_CHANGE:
      case UserTransactionType.LINK_CHARGE:
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
      m('.col-12.mb-4', t.__('Address Type') + ': ' + transactionList.addressType),
      m('.col-12', 
        m('.row.row-cols-12.d-lg-flex', 
          m('.col', 
            m('.row', [
              m('.col-lg-6.col-12', m(WalletSum, {amount: transactionList.balance, unit: 'GDD', name: 'GDD', active: true})),
            ])
          )
        )
      ),
      m('.col-12', 
        m('.main-content.mt-lg-3.mt-0', 
          m('.list-group.transactions-list',
            transactionList.transactions === undefined || transactionList.transactions.length === 0 ? 
            m('.mt-4.text-center', t.__('You don\'t have any transactions on your account yet.'))
            : transactionList.transactions.map((transaction) => this.chooseTransactionTypeView(transaction))
          )
        )
      )
    ])
  }
}
