import * as v from 'valibot'
import { CONFIG } from '../config'
import { 
  ListTransactionsQueryInput, listTransactionsQuerySchema, 
  TransactionsRangeInput, transactionsRangeSchema 
} from './input.schema'
import { 
  listTransactionsResultSchema, getTransactionsResultSchema, 
  ListTransactionsResult, GetTransactionsResult, 
  ListCommunitiesResult, listCommunitiesResultSchema 
} from './output.schema'

async function sendRequest<Input>(method: string, params: Input): Promise<any> {
  const jsonRpc = {
    jsonrpc: '2.0',
    id: Math.random(),
    method,
    params
  }
  const response = await fetch(CONFIG.NODE_SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jsonRpc)
  })
  const result = await response.json()
  if(result.error) {
    throw new Error(result.error.message)
  }
  return result.result
}

class Client {
  async listCommunities(): Promise<ListCommunitiesResult> {
    const response = await sendRequest('listCommunities', {})
    return v.parse(listCommunitiesResultSchema, response)
  }

  async listTransactions(params: ListTransactionsQueryInput): Promise<ListTransactionsResult> {
    const response = await sendRequest('listTransactions', v.parse(listTransactionsQuerySchema, params))
    return v.parse(listTransactionsResultSchema, response)
  }

  async getTransactions(params: TransactionsRangeInput): Promise<GetTransactionsResult> {
    const response = await sendRequest('getTransactions', v.parse(transactionsRangeSchema, params))
    return v.parse(getTransactionsResultSchema, response)
  }
}

export const gradidoNodeClient = new Client()

