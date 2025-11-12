import m from 'mithril'
import { TransactionListRaw } from '../components/TransactionListRaw'
import { TransactionExcerpt } from '../models/TransactionExcerpt'
import { WalletSum } from '../components/WalletSum'
import { CONFIG } from '../config'
import { gradidoNodeClient } from '../client/gradidoNodeClient'
import { GetTransactionsResult } from '../client/output.schema'
import { CommunitySwitch } from '../components/CommunitySwitch'
import { Pagination } from '../components/bootstrap/Pagination'

interface Attrs {
  communityId: string
  pageSize?: number
}

export class LastTransactions implements m.ClassComponent<Attrs> {
  transactionsResult: GetTransactionsResult | undefined = undefined
  communityId: string | undefined = undefined
  currentPage: number = 1
  totalPages: number = 0
  pageSize: number = 20
  autoPollTimeout: NodeJS.Timeout | undefined = undefined
  
  oninit({attrs}: m.CVnode<Attrs>) {
    if (attrs.communityId) {
      this.updateCommunityId(attrs.communityId)
    }
    if (attrs.pageSize && attrs.pageSize > 0) {
      this.pageSize = attrs.pageSize
    }
  }
  
  async fetchTransactions(page: number) {
    if(this.autoPollTimeout) {
      clearTimeout(this.autoPollTimeout)
    }
    if(!this.communityId) {
      return
    }
    try {
      this.transactionsResult = await gradidoNodeClient.getTransactions({
        fromTransactionId: (page - 1) * this.pageSize,
        communityId: this.communityId,
        maxResultCount: this.pageSize
      })
      this.currentPage = page
      m.redraw()  
    } catch(e) {
      console.warn(`fetchTransactions: ${e}`)
    } finally {
      if(CONFIG.AUTO_POLL_INTERVAL > 0) {
        this.autoPollTimeout = setTimeout(() => this.fetchTransactions(this.currentPage), CONFIG.AUTO_POLL_INTERVAL)
      }
    }
  }

  updateCommunityId(communityId: string) {
    if(this.autoPollTimeout) {
      clearTimeout(this.autoPollTimeout)
      this.autoPollTimeout = undefined
    }
    this.communityId = communityId
    m.route.set('/' + communityId)
    this.currentPage = 1
    this.fetchTransactions(this.currentPage)
  }

  getPagination(transactionsResult: GetTransactionsResult): m.Child {
    return m(Pagination, { 
        currentPage: this.currentPage,
        totalPages: Math.ceil(transactionsResult.totalCount / this.pageSize),
        ariaLabel: t.__(
          'Pagination for transactions overview',
          { communityId: this.communityId }
        ),
        onPageChange: (page: number) => this.fetchTransactions(page),
        pill: true,
      }
    )
  }

  viewTransactions() {
    if(!this.transactionsResult) {
      return
    }
    const { gmwBalance, aufBalance, timeUsed, transactions } = this.transactionsResult
    return [
      m('.row', [
        m('.col-lg-3.col-6', m(WalletSum, {amount: aufBalance, unit: 'GDD', name: 'AUF', active: true})),
        // m('.col-lg-6.col-md-0.col-0'),
        m('.col-lg-3.col-6', m(WalletSum, {amount: gmwBalance, unit: 'GDD', name: 'GMW', active: true})),
      ]),
      m('.mt-lg-3'),
      this.getPagination(this.transactionsResult),
      m(TransactionListRaw, { 
        transactions: transactions.map((transaction) => 
            new TransactionExcerpt(transaction)
        ) 
      }),
      this.getPagination(this.transactionsResult),
      m('', 'time used: ' + timeUsed)
    ]
  } 

  view() 
  {
    return [
      m('div.container', [
        m('h1',  t.__('Transactions overview')),
        m('.row.mt-3.mb-3', [
            m('.col-lg-3.col-6', m('h2', t.__('Community Selection'))),
            m('.col-lg-6.col-9', m(CommunitySwitch, { 
                setCommunityId: (communityId: string) => this.updateCommunityId(communityId),
                defaultCommunityId: this.communityId,
            })),// m('.col-lg-6.col-md-0.col-0'),
        ]),
        this.transactionsResult ? this.viewTransactions() : undefined,
      ])
    ]
  }
}
