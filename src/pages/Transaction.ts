import m from 'mithril'
import { Title } from '../components/Title'
import { gradidoNodeClient } from '../client/gradidoNodeClient'
import { GetTransactionResult } from '../client/output.schema'
import { detectSearchType } from '../utils/detectType'
import { SearchType, searchTypeToString } from '../enum/SearchType'
import { t } from '../utils/i18n'

interface Attrs {
  communityId: string
  search: string  
}

export class Transaction implements m.ClassComponent<Attrs> {
  transactionResponse: GetTransactionResult | undefined = undefined
  searchType: SearchType = SearchType.UNKNOWN
  
  oninit({attrs}: m.CVnode<Attrs>) {
    this.searchType = detectSearchType(attrs.search)
    this.transactionResponse = undefined
    this.fetchTransaction(attrs.search, attrs.communityId)
  }
  async fetchTransaction(search: string, communityId: string) {
    try {
      
      if(this.searchType === SearchType.TRANSACTION_NR) {
        this.transactionResponse = await gradidoNodeClient.getTransaction({
          communityId,
          transactionId: Number(search),
        })
      } else if(this.searchType === SearchType.HIERO_TRANSACTION_ID) {
        this.transactionResponse = await gradidoNodeClient.getTransaction({
          communityId,
          hieroTransactionId: search,
        })
      }
      console.log(this.transactionResponse)
      m.redraw()
    } catch (e) {
      toaster.error(e)
      m.route.set('/')
    }
  }

  view({attrs}: m.CVnode<Attrs>) {    
    return m('div.container', [
      m(Title, {title: t.__('Search Type: ') + ' ' + searchTypeToString(this.searchType), subtitle: attrs.search}),
      m('.row.d-flex', [
        m('.col-2.d-none.d-lg-block'),
        m('.col', 
          this.transactionResponse 
          ? m('', 'gefunden!')
          : t.__('No transaction found')
        ),
        m('.col-3.d-none.d-lg-block')
      ])
    ])
  }
}

