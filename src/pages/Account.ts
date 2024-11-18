import m from 'mithril'
import { TransactionList } from '../models/TransactionList'
import { plainToInstance } from 'class-transformer'
import { TransactionListView } from '../components/TransactionListView'
import { Title } from '../components/Title'

interface Attrs {
  id: string
}

interface State {
  transactionList: TransactionList | undefined
  timeUsed: string
}

export class Account implements m.ClassComponent<Attrs> {
  private state: State
  constructor() 
  {
    this.state = { transactionList: undefined, timeUsed: '' }
  }

  oninit({attrs}: m.CVnode<Attrs>) {
    this.fetchTransactions(attrs.id)
  }
  async fetchTransactions(pubkey: string) {
    const response = await fetch(nodeServerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'listtransactions',
            params: {
                groupAlias,
                pageSize: 10,
                pubkey
            },
            id: Math.random()
        })
    })
    const r = await response.json()
    if (r.result) {
      this.state.transactionList = plainToInstance(TransactionList, r.result.transactionList as TransactionList)
      this.state.timeUsed = r.result.timeUsed
      console.log('response', this.state)
      m.redraw()
    } else if(r.error) {
      toaster.error(r.error.message)
      m.route.set('/')
    }
    
    
  }
  view({attrs}: m.CVnode<Attrs>) {
    if(this.state.transactionList) {
      return m('div.container', [
        m(Title, {title: t.__('Transactions')}),
        m('.row.d-flex', [
          m('.col-2.d-none.d-lg-block'),
          m('.col', [
            m(TransactionListView, {transactionList: this.state.transactionList}),
            m('', this.state.timeUsed)
          ]),
          m('.col-3.d-none.d-lg-block')
      ])
      ])
    } else {
      return m('', t.__('Loading....'))
    }
  }
}

