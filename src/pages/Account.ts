import m from 'mithril'
import { ListTransactionsResult } from '../client/output.schema'
import { TransactionListView } from '../components/TransactionListView'
import { Title } from '../components/Title'
import { gradidoNodeClient } from '../client/gradidoNodeClient'
import { CONFIG } from '../config'

interface Attrs {
  communityId: string
  id: string  
}

export class Account implements m.ClassComponent<Attrs> {
  transactionListResponse: ListTransactionsResult | undefined = undefined
  reloadTimerId: ReturnType<typeof setTimeout> | undefined = undefined
  loading: boolean = false
  
  oninit({attrs}: m.CVnode<Attrs>) {
    clearTimeout(this.reloadTimerId)
    this.transactionListResponse = undefined
    this.fetchTransactions(attrs.id, attrs.communityId)
  }
  async fetchTransactions(pubkey: string, communityId: string) {
    this.loading = true
    try {
      this.transactionListResponse = await gradidoNodeClient.listTransactions({
        communityId,
        pubkey,
        pageSize: 10,
      })
      m.redraw()
      if(CONFIG.AUTO_POLL_INTERVAL > 0) {
        this.reloadTimerId = setTimeout(() => this.fetchTransactions(pubkey, communityId), CONFIG.AUTO_POLL_INTERVAL)
      }
    } catch (e) {
      toaster.error(e)
      m.route.set('/')
    } finally {
      this.loading = false
    }
  }
  viewData(data: ListTransactionsResult) {
    return [
      m(TransactionListView, {transactionList: data.transactionList}),
      m('', data.timeUsed)
    ]
  }

  view({attrs}: m.CVnode<Attrs>) {    
    return m('div.container', [
      m(Title, {title: t.__('Transactions for'), subtitle: attrs.id}),
      m('.row.d-flex', [
        m('.col-2.d-none.d-lg-block'),
        m('.col', 
          this.transactionListResponse 
          ? this.viewData(this.transactionListResponse) 
          : this.loading
            ? t.__('Loading...')
            : t.__('No transactions found')
        ),
        m('.col-3.d-none.d-lg-block')
      ])
    ])
  }
}

