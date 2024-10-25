import m from 'mithril'
import TransactionList from './TransactionList'
import { TransactionExcerpt } from '../models/TransactionExcerpt'
import { ConfirmedTransaction } from '../models/ConfirmedTransaction'
import { plainToInstance } from 'class-transformer'

interface AppState {
    transactions: ConfirmedTransaction[]
    loading: boolean
}

class App implements m.ClassComponent<{}> {
    state: AppState
    constructor() {
      this.state = {
        transactions: [],
        loading: true
      }
      this.fetchTransactions();
      //setInterval(() => this.fetchTransactions(), 250); // 4 mal pro Sekunde
    }
    fetchTransactions = async () => {
        const response = await fetch('http://0.0.0.0:8340/api', {
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
                    groupAlias: '77c8732a4584cb1e099ae0c4bcc3cad9b453895f1449a42d53f82174b0527da6',
                },
                id: 1
            })
        })
        const result = await response.json();
        
        if (result.result.transactions.length !== this.state.transactions.length) {
          this.state.transactions = result.result.transactions.map((transaction: any) => 
            plainToInstance(ConfirmedTransaction, transaction)
          )
        }
        this.state.loading = false;
        m.redraw()
    }
    view({attrs}: m.CVnode<{}>) {
        return m('div.container', [
            m('h1', 'Transaktionsübersicht'),
            this.state.loading ? m('p', 'Lade...') : m(TransactionList, { 
                transactions: this.state.transactions.map((transaction) => 
                    new TransactionExcerpt(transaction)
                ) 
            })
        ])
    }
}

export default App
