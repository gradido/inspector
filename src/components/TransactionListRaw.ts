import m from 'mithril'
import { TransactionExcerpt } from '../models/TransactionExcerpt'


interface Attrs {
    transactions: TransactionExcerpt[]
}

interface State {
    transactionsShowDetailState: boolean[]
}

export const TransactionListRaw: m.Component<Attrs, State> = {
  oninit: ({attrs, state}) => {
    state.transactionsShowDetailState = []
    attrs.transactions.map((_value, index) => state.transactionsShowDetailState[index] = false)
  },
  view: ({attrs: {transactions}, state: {transactionsShowDetailState}}) => {
      return m('table.table.table-striped', [
          m('thead', [
              m('tr', [
                  m('th', 'CreatedAt Date'),
                  m('th', 'ConfirmedAt Date'),
                  m('th', 'Transaction type'),
                  m('th', 'amount')
              ])
          ]),
          m('tbody', transactions.map((transaction, index) => {
              return [
                m('tr', {
                  onmouseenter: (e: MouseEvent) => {
                      const target = e.currentTarget as HTMLTableRowElement
                      if (target) {
                          target.classList.add('table-active');
                      }
                  },
                  onmouseleave: (e: MouseEvent) => {
                      const target = e.currentTarget as HTMLTableRowElement
                      if (target) {
                          target.classList.remove('table-active')
                      }
                  },
                  onclick: () => {
                      transactionsShowDetailState[index] = !transactionsShowDetailState[index]
                  }
                }, [
                  m('td', transaction.createdAt.toLocaleString()),
                  m('td', transaction.confirmedAt.toLocaleString()),
                  m('td', transaction.transactionType),
                  m('td', transaction.amount + ' GDD')
              ]),
              transactionsShowDetailState[index] ? m('tr', m('td', {colspan: 3}, m('div', m.trust(transaction.details)))): null
            ]
          }))
      ])
  }
}
