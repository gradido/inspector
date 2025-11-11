import m from 'mithril'
import { ListTransactionsResult } from '../client/output.schema'
import { TransactionListView } from '../components/TransactionListView'
import { Title } from '../components/Title'
import { gradidoNodeClient } from '../client/gradidoNodeClient'
import { CONFIG } from '../config'
import { t } from '../utils/i18n'
import { ValiError } from 'valibot'
import { ValibotError } from '../components/ValibotError'
import { Pagination } from '../components/bootstrap/Pagination'

interface Attrs {
  communityId: string
  pubkey: string  
  pageSize?: number
}

export class Account implements m.ClassComponent<Attrs> {
  transactionListResponse: ListTransactionsResult | undefined = undefined
  reloadTimerId: ReturnType<typeof setTimeout> | undefined = undefined
  loading: boolean = false
  errorView: m.Children | undefined = undefined
  currentPage: number = 1
  pageSize: number = 5
  
  oninit({attrs}: m.CVnode<Attrs>) {
    console.log(`Account.oninit: ${attrs.pubkey}, ${attrs.communityId}`)
    if(this.reloadTimerId) {
      clearTimeout(this.reloadTimerId)
    }
    if (attrs.pageSize && attrs.pageSize > 0) {
      this.pageSize = attrs.pageSize
    }
    this.currentPage = 1
    this.transactionListResponse = undefined
    this.fetchTransactions(attrs.pubkey, attrs.communityId)
  }
  async fetchTransactions(pubkey: string, communityId: string) {
    this.loading = true
    console.log('fetchTransactions: ', pubkey, communityId)
    if (this.reloadTimerId) {
      clearTimeout(this.reloadTimerId)
    }
    try {
      this.transactionListResponse = await gradidoNodeClient.listTransactions({
        communityId,
        pubkey,
        pageSize: this.pageSize,
        currentPage: this.currentPage
      })
      if(CONFIG.AUTO_POLL_INTERVAL > 0) {
        this.reloadTimerId = setTimeout(() => this.fetchTransactions(pubkey, communityId), CONFIG.AUTO_POLL_INTERVAL)
      }
    } catch (e) {
      if (e instanceof ValiError) {
        // console.error(e)
        this.errorView = m(ValibotError, {error: e})
        console.log('error view set', this.errorView)
      } else {
        console.error(e)
        toaster.error(e)
        m.route.set('/')
      }
    } finally {
      this.loading = false
      m.redraw()
    }
  }
  viewData(data: ListTransactionsResult, attrs: Attrs) {
    return [
      m(TransactionListView, {transactionList: data.transactionList}),
      m(Pagination, {
        currentPage: this.currentPage,
        totalPages: Math.ceil(data.transactionList.count / this.pageSize),
        ariaLabel: t.__('Pagination for transactions'),
        onPageChange: (page: number) => {
          this.currentPage = page
          this.fetchTransactions(attrs.pubkey, attrs.communityId)
        },
        pill: true,
      }),
      m('', data.timeUsed)
    ]
  }

  view({attrs}: m.CVnode<Attrs>) {    
    return m('div.container', [
      m(Title, {title: t.__('Transactions for'), subtitle: attrs.pubkey}), [
        m('.row.d-flex.error-view', this.errorView),      
        m('.row.d-flex', [
          m('.col-2.d-none.d-lg-block'),
          m('.col', 
            this.transactionListResponse 
            ? this.viewData(this.transactionListResponse, attrs) 
            : this.loading
              ? t.__('Loading...')
              : t.__('No transactions found')
          ),
          m('.col-3.d-none.d-lg-block')
        ])
      ]
    ])
  }
}

