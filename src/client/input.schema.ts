import * as v from 'valibot'

export const transactionsRangeSchema = v.object({
  // default value is 1, from first transactions
  fromTransactionId: v.nullish(v.pipe(v.number(), v.minValue(0, 'expect number >= 0')), 0),
  // default value is 100, max 100 transactions
  maxResultCount: v.nullish(v.pipe(v.number(), v.minValue(1, 'expect number >= 1')), 100),
  communityId: v.string(),
  format: v.optional(v.literal('json'), 'json'),
})

export type TransactionsRangeInput = v.InferInput<typeof transactionsRangeSchema>
export type TransactionsRange = v.InferOutput<typeof transactionsRangeSchema>

export const listTransactionsQuerySchema = v.object({
  communityId: v.string(),
  pubkey: v.string(),
  pageSize: v.nullish(v.pipe(v.number(), v.minValue(1, 'expect number >= 1'), v.maxValue(100, 'expect number <= 100'))),
  currentPage: v.nullish(v.pipe(v.number(), v.minValue(1, 'expect number >= 1'))),
  orderDESC: v.nullish(v.union([v.literal('ASC'), v.literal('DESC')])),
  onlyCreations: v.nullish(v.boolean()),
})

export type ListTransactionsQueryInput = v.InferInput<typeof listTransactionsQuerySchema>
export type ListTransactionsQuery = v.InferOutput<typeof listTransactionsQuerySchema>
