import m from 'mithril'
import { TransactionListRaw } from '../components/TransactionListRaw'
import { TransactionExcerpt } from '../models/TransactionExcerpt'
import { ConfirmedTransaction } from '../models/ConfirmedTransaction'
import { plainToInstance } from 'class-transformer'
import { WalletSum } from '../components/WalletSum'

interface State {
    transactions: ConfirmedTransaction[]
    gmwBalance: string
    aufBalance: string 
    timeUsed: string
}

export class LastTransactions implements m.ClassComponent<{}> {
    state: State
    constructor() {
      this.state = {
        transactions: [],
        gmwBalance: '0',
        aufBalance: '0',
        timeUsed: ''
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
        const { aufBalance, gmwBalance, timeUsed, transactions } = result.result
        if (result.result.transactions.length !== this.state.transactions.length) {
            
            this.state = {
                aufBalance,
                gmwBalance,
                timeUsed,
                transactions: transactions.map((transaction: any) => {
                    transaction.gradidoTransaction.bodyBytes = transaction.gradidoTransaction.bodyBytes.json
                    const obj = plainToInstance(ConfirmedTransaction, transaction)
                    return obj
                })
            }
        } else {
            this.state = {
                aufBalance: '0',
                gmwBalance: '0',
                timeUsed,
                transactions: []
            }
        }
        m.redraw()
    }
    view() {
        // const i = i18n()
        const { aufBalance, gmwBalance, timeUsed, transactions } = this.state
        return [
            m('div.container', [
                m('h1',  t.__('Transactions overview')),
                m('.row', [
                    m('.col-lg-3.col-6', m(WalletSum, {amount: aufBalance, unit: 'GDD', name: 'AUF', active: true})),
                    // m('.col-lg-6.col-md-0.col-0'),
                    m('.col-lg-3.col-6', m(WalletSum, {amount: gmwBalance, unit: 'GDD', name: 'GMW', active: true})),
                ]),
                m('.mt-lg-3'),
                m(TransactionListRaw, { 
                    transactions: transactions.map((transaction) => 
                        new TransactionExcerpt(transaction)
                    ) 
                }),
                m('', 'time used: ' + timeUsed)
            ])
        ]
    }
}
