import * as v from 'valibot'
import { CONFIG } from '../config'
import { GradidoNodeErrorCodes } from '../enum/GradidoNodeErrorCodes'
import {
  type ListTransactionsQueryInput,
  listTransactionsQuerySchema,
  type TransactionIdentifierInput,
  type TransactionsRangeInput,
  transactionIdentifierSchema,
  transactionsRangeSchema,
} from './input.schema'
import {
  type GetTransactionResult,
  type GetTransactionsResult,
  getTransactionResultSchema,
  getTransactionsResultSchema,
  type ListCommunitiesResult,
  type ListTransactionsResult,
  listCommunitiesResultSchema,
  listTransactionsResultSchema,
} from './output.schema'

class JsonRpcError extends Error {
  constructor(
    public readonly code: number,
    public readonly message: string,
  ) {
    super(message)
  }
}

async function sendRequest<Input>(method: string, params: Input): Promise<unknown> {
  const jsonRpc = {
    jsonrpc: '2.0',
    id: Math.random(),
    method,
    params,
  }
  const response = await fetch(CONFIG.DLT_NODE_SERVER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jsonRpc),
  })
  const result = await response.json()
  if (result.error) {
    throw new JsonRpcError(result.error.code, result.error.message)
  }
  return result.result
}

class Client {
  async listCommunities(): Promise<ListCommunitiesResult> {
    const response = await sendRequest('listCommunities', {})
    return v.parse(listCommunitiesResultSchema, response)
  }

  async listTransactions(params: ListTransactionsQueryInput): Promise<ListTransactionsResult> {
    const response = await sendRequest(
      'listTransactions',
      v.parse(listTransactionsQuerySchema, params),
    )
    return v.parse(listTransactionsResultSchema, response)
  }

  async getTransactions(params: TransactionsRangeInput): Promise<GetTransactionsResult> {
    const response = await sendRequest('getTransactions', v.parse(transactionsRangeSchema, params))
    return v.parse(getTransactionsResultSchema, response)
  }

  async getTransaction(
    params: TransactionIdentifierInput,
  ): Promise<GetTransactionResult | undefined> {
    try {
      const response = await sendRequest(
        'getTransaction',
        v.parse(transactionIdentifierSchema, params),
      )
      return v.parse(getTransactionResultSchema, response)
    } catch (e) {
      if (e instanceof JsonRpcError) {
        if (e.code === GradidoNodeErrorCodes.TRANSACTION_NOT_FOUND) {
          return undefined
        }
      } else {
        throw e
      }
    }
  }
}

export const gradidoNodeClient = new Client()
