import m from 'mithril'
import { TransactionListRaw } from '../components/TransactionListRaw'
import { TransactionExcerpt } from '../models/TransactionExcerpt'
import { ConfirmedTransaction } from '../models/ConfirmedTransaction'
import { plainToInstance } from 'class-transformer'

interface State {
    transactions: ConfirmedTransaction[]
    loading: boolean
}

export class LastTransactions implements m.ClassComponent<{}> {
    state: State
    constructor() {
      this.state = {
        transactions: [],
        loading: true
      }      
      this.fetchTransactions();
      // setInterval(() => this.fetchTransactions(), 10000); // 4 mal pro Sekunde
    }
    async fetchTransactions() {
        const response = await fetch(nodeServerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                method: 'getTransactions',
                params: {
                    fromTransactionId: 0,
                    format: 'json',
                    groupAlias,
                    pageSize: 10
                },
                id: 1
            })
        })
        const result = await response.json();
        
        if (result.result.transactions.length !== this.state.transactions.length) {
          this.state.transactions = result.result.transactions.map((transaction: any) => {
            transaction.gradidoTransaction.bodyBytes = transaction.gradidoTransaction.bodyBytes.json
            const obj = plainToInstance(ConfirmedTransaction, transaction)
            return obj
          })
        }
        this.state.loading = false;
        m.redraw()
    }
    view() {
        // const i = i18n()
        return [
            m('div.container', [
                m('h1',  t.__('Transactions overview')),
                this.state.loading ? m('p', 'Lade...') : m(TransactionListRaw, { 
                    transactions: this.state.transactions.map((transaction) => 
                        new TransactionExcerpt(transaction)
                    ) 
                })
            ])
        ]
    }
}
