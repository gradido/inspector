import m from 'mithril'
import { TransactionList } from '../models/TransactionList'
import { WalletSum } from './WalletSum'

interface Attrs {
  transactionList: TransactionList
}

interface State {
    transactionsShowDetailState: boolean[]
}

export const TransactionListView: m.Component<Attrs, State> = {
  oninit: ({attrs, state}) => {
    state.transactionsShowDetailState = []
    attrs.transactionList.transactions.map((_value, index) => state.transactionsShowDetailState[index] = false)
  },
  view: ({attrs: {transactionList}, state: {transactionsShowDetailState}}) => {
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
      )
    ])
  }
}
