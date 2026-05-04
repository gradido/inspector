import m from 'mithril'
import * as v from 'valibot'
import { gradidoNodeClient } from '../client/gradidoNodeClient'
import type { GetTransactionsResult } from '../client/output.schema'
import { CommunitySwitch } from '../components/CommunitySwitch'
import { Pagination } from '../components/view/bootstrap/Pagination'
import { TransactionView } from '../components/view/transaction'
import type { ViewAttrs } from '../components/view/transaction/viewAttrs'
import { WalletSum } from '../components/WalletSum'
import { CONFIG } from '../config'
import { SearchDirection } from '../enum/SearchDirection'
import { WireOutputFormat } from '../enum/WireOutputFormat'
import type { ConfirmedTransaction } from '../schemas/transaction.schema'

interface Attrs {
  communityId: string
  page?: string
  pageSize?: number
}

export class TransactionsList implements m.ClassComponent<Attrs> {
  transactionsResult: GetTransactionsResult | undefined = undefined
  lastKnownCommunityId: string | undefined = undefined
  currentPage: number = 1
  lastSetPage: string = ''
  transactionsCount: number = 0
  pageSize: number = CONFIG.PAGINATION_PAGE_SIZE
  autoPollTimeout: NodeJS.Timeout | undefined = undefined

  oninit({ attrs }: m.CVnode<Attrs>) {
    if (attrs.communityId) {
      this.refetchTransactions(attrs.communityId, attrs.page)
    }
    if (attrs.pageSize && attrs.pageSize > 0) {
      this.pageSize = attrs.pageSize
    }
  }
  onupdate({ attrs }: m.VnodeDOM<Attrs, this>) {
    if (this.lastKnownCommunityId !== attrs.communityId || (attrs.page && this.lastSetPage !== attrs.page)) {
      this.lastSetPage = attrs.page || String(this.currentPage)
      if (this.transactionsCount && attrs.page && Number(attrs.page) > Math.ceil(this.transactionsCount / this.pageSize)) {
        toaster.error(t.__('Page not found'))
        m.route.set(`/${attrs.communityId}/${this.currentPage}`)
      } else {
        this.refetchTransactions(attrs.communityId, attrs.page)
      }
    }
  }

  onremove() {
    if (this.autoPollTimeout) {
      clearTimeout(this.autoPollTimeout)
    }
  }

  async fetchTransactions(communityId: string, page: number) {
    m.route.set(`/${communityId}/${page}`)
    if (this.autoPollTimeout) {
      clearTimeout(this.autoPollTimeout)
    }
    if (!communityId) {
      return
    }
    try {
      this.transactionsResult = await gradidoNodeClient.getTransactions({
        communityId: communityId,
        format: WireOutputFormat.Json,
        pagination: {
          size: this.pageSize,
          page,
        },
        searchDirection: SearchDirection.DESC,
      })
      this.currentPage = page
      this.transactionsCount = this.transactionsResult.totalCount
      if (this.transactionsResult.transactions.length === 0 && page > 1) {
        m.route.set(`/${communityId}/${this.currentPage - 1}`)
      }
      m.redraw()
    } catch (e) {
      if (e instanceof v.ValiError) {
        console.warn(`fetchTransactions: ${JSON.stringify(e.issues, null, 2)}`)
      } else {
        console.warn(`fetchTransactions: ${e}`)
      }
    } finally {
      if (CONFIG.AUTO_POLL_INTERVAL > 0) {
        this.autoPollTimeout = setTimeout(
          () => this.fetchTransactions(communityId, this.currentPage),
          CONFIG.AUTO_POLL_INTERVAL,
        )
      }
    }
  }

  refetchTransactions(communityId: string, page: string = '1') {
    if (this.autoPollTimeout) {
      clearTimeout(this.autoPollTimeout)
      this.autoPollTimeout = undefined
    }
    this.currentPage = Number(page)
    if (this.currentPage < 0) {
      // revert page order on negative page (page assuming asc order, but we have desc order)
      if (this.transactionsCount) {
        this.currentPage = Math.ceil(this.transactionsCount / this.pageSize) + this.currentPage
      } else {
        this.currentPage = 1
      }
    }
    this.fetchTransactions(communityId, this.currentPage)
    this.lastKnownCommunityId = communityId
  }

  getPagination(transactionsResult: GetTransactionsResult, communityId: string): m.Child {
    return m(Pagination, {
      currentPage: this.currentPage,
      totalPages: Math.ceil(transactionsResult.totalCount / this.pageSize),
      ariaLabel: t.__('Pagination for transactions overview'),
      onPageChange: (page: number) => this.fetchTransactions(communityId, page),
      pill: true,
    })
  }

  viewTransactions(communityId: string) {
    if (!this.transactionsResult) {
      return
    }
    const { gmwBalance, timeUsed, aufBalance, transactions } = this.transactionsResult
    return [
      m('.row', [
        m(
          '.col-lg-3.col-6',
          m(WalletSum, {
            amount: aufBalance,
            unit: 'GDD',
            name: 'AUF',
            active: true,
          }),
        ),
        // m('.col-lg-6.col-md-0.col-0'),
        m(
          '.col-lg-3.col-6',
          m(WalletSum, {
            amount: gmwBalance,
            unit: 'GDD',
            name: 'GMW',
            active: true,
          }),
        ),
      ]),
      m('.mt-lg-3'),
      m('.col-lg-8.col-md-10.col-12', [
        this.getPagination(this.transactionsResult, communityId),
        transactions.map((transaction: ConfirmedTransaction) =>
          m(TransactionView, { transaction, communityId } as ViewAttrs),
        ),
        this.getPagination(this.transactionsResult, communityId),
        m('', `time used: ${this.transactionsResult.timeUsed}`),
      ]),
    ]
  }

  view({ attrs }: m.CVnode<Attrs>) {
    return [
      m('div.container', [
        m('h1', t.__('Transactions overview')),
        m('.row.mt-3.mb-3', [
          m('.col-lg-3.col-6', m('h2', t.__('Community Selection'))),
          m('.col-lg-6.col-9', m(CommunitySwitch, attrs)), // m('.col-lg-6.col-md-0.col-0'),
        ]),
        this.transactionsResult ? this.viewTransactions(attrs.communityId) : undefined,
      ]),
    ]
  }
}
