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
                  m('th', t.__('Transaction Nr')),
                  m('th', t.__('CreatedAt Date')),
                  m('th', t.__('ConfirmedAt Date')),
                  m('th', t.__('Transaction Type')),
                  m('th', t.__('Amount'))
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
                  m('td', transaction.id),
                  m('td', transaction.createdAt.toLocaleString()),
                  m('td', transaction.confirmedAt.toLocaleString()),
                  m('td', transaction.transactionType),
                  m('td', transaction.amount + ' GDD')
              ]),
              transactionsShowDetailState[index] ? m('tr', m('td', {colspan: 5}, m('div', m.trust(transaction.details)))): null
            ]
          }))
      ])
  }
}
