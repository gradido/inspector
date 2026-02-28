import m from 'mithril'
import * as v from 'valibot'
import { gradidoNodeClient } from '../client/gradidoNodeClient'
import type { GetTransactionsResult } from '../client/output.schema'
import { CommunitySwitch } from '../components/CommunitySwitch'
import { Pagination } from '../components/view/bootstrap/Pagination'
import { WalletSum } from '../components/WalletSum'
import { CONFIG } from '../config'
import { TransactionView } from '../components/view/transaction'
import { ConfirmedTransaction } from '../schemas/transaction.schema'
import { ViewAttrs } from '../components/view/transaction/viewAttrs'

interface Attrs {
  communityId: string
  pageSize?: number
}

export class LastTransactions implements m.ClassComponent<Attrs> {
  transactionsResult: GetTransactionsResult | undefined = undefined
  lastKnownCommunityId: string | undefined = undefined
  currentPage: number = 1
  totalPages: number = 0
  pageSize: number = 20
  autoPollTimeout: NodeJS.Timeout | undefined = undefined

  oninit({ attrs }: m.CVnode<Attrs>) {
    if (attrs.communityId) {
      this.refetchTransactions(attrs.communityId)
    }
    if (attrs.pageSize && attrs.pageSize > 0) {
      this.pageSize = attrs.pageSize
    }
  }
  onupdate({ attrs }: m.VnodeDOM<Attrs, this>) {
    if (this.lastKnownCommunityId !== attrs.communityId) {
      this.refetchTransactions(attrs.communityId)
    }
  }

  async fetchTransactions(page: number, communityId: string) {
    if (this.autoPollTimeout) {
      clearTimeout(this.autoPollTimeout)
    }
    if (!communityId) {
      return
    }
    try {
      this.transactionsResult = await gradidoNodeClient.getTransactions({
        fromTransactionId: (page - 1) * this.pageSize + 1,
        communityId: communityId,
        maxResultCount: this.pageSize,
      })
      this.currentPage = page
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
          () => this.fetchTransactions(this.currentPage, communityId),
          CONFIG.AUTO_POLL_INTERVAL,
        )
      }
    }
  }

  refetchTransactions(communityId: string) {
    if (this.autoPollTimeout) {
      clearTimeout(this.autoPollTimeout)
      this.autoPollTimeout = undefined
    }
    this.currentPage = 1
    this.fetchTransactions(this.currentPage, communityId)
    this.lastKnownCommunityId = communityId
  }

  getPagination(transactionsResult: GetTransactionsResult, communityId: string): m.Child {
    return m(Pagination, {
      currentPage: this.currentPage,
      totalPages: Math.ceil(transactionsResult.totalCount / this.pageSize),
      ariaLabel: t.__('Pagination for transactions overview'),
      onPageChange: (page: number) => this.fetchTransactions(page, communityId),
      pill: true,
    })
  }

  viewTransactions(communityId: string) {
    if (!this.transactionsResult) {
      return
    }
    const { gmwBalance, aufBalance, timeUsed, transactions } = this.transactionsResult
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
        transactions.map((transaction: ConfirmedTransaction) => m(TransactionView, { transaction, communityId } as ViewAttrs)),
        this.getPagination(this.transactionsResult, communityId),
        m('', `time used: ${timeUsed}`),
      ]),
    ]
  }

  view({ attrs }: m.CVnode<Attrs>) {
    return [
      m('div.container', [
        m('h1', t.__('Transactions overview')),
        m('.row.mt-3.mb-3', [
          m('.col-lg-3.col-6', m('h2', t.__('Community Selection'))),
          m(
            '.col-lg-6.col-9',
            m(CommunitySwitch, attrs),
          ), // m('.col-lg-6.col-md-0.col-0'),
        ]),
        this.transactionsResult ? this.viewTransactions(attrs.communityId) : undefined,
      ]),
    ]
  }
}
