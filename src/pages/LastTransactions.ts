import m from 'mithril'
import { TransactionListRaw } from '../components/TransactionListRaw'
import { TransactionExcerpt } from '../models/TransactionExcerpt'
import { WalletSum } from '../components/WalletSum'
import { CONFIG } from '../config'
import { gradidoNodeClient } from '../client/gradidoNodeClient'
import { GetTransactionsResult } from '../client/output.schema'
import { CommunitySwitch } from '../components/CommunitySwitch'
import { t } from '../utils/i18n'

interface Attrs {
  communityId: string
}

export class LastTransactions implements m.ClassComponent<Attrs> {
  transactionsResult: GetTransactionsResult | undefined = undefined
  communityId: string | undefined = undefined
  
  oninit({attrs}: m.CVnode<Attrs>) {
    if (attrs.communityId) {
      this.updateCommunityId(attrs.communityId)
    }
  }
  
  async fetchTransactions() {
    if(!this.communityId) {
      return
    }
    try {
      this.transactionsResult = await gradidoNodeClient.getTransactions({
        fromTransactionId: 0,
        communityId: this.communityId,
        maxResultCount: 100
      })
      m.redraw()  
    } catch(e) {
      console.warn(`fetchTransactions: ${e}`)
    } finally {
      if(CONFIG.AUTO_POLL_INTERVAL > 0) {
        setTimeout(() => this.fetchTransactions(), CONFIG.AUTO_POLL_INTERVAL)
      }
    }
  }

  updateCommunityId(communityId: string) {
    this.communityId = communityId
    m.route.set('/' + communityId)
    this.fetchTransactions()
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
      m(TransactionListRaw, { 
        transactions: transactions.map((transaction) => 
            new TransactionExcerpt(transaction)
        ) 
    }),
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
