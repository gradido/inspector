import * as v from 'valibot'
import { PublicKeySearchType } from '../enum/PublicKeySearchType'
import { SearchDirection } from '../enum/SearchDirection'
import { TransactionType } from '../enum/TransactionType'
import { WireOutputFormat } from '../enum/WireOutputFormat'
import { hieroTransactionIdRegex } from '../schemas/basic.schema'
import { dateStringSchema } from '../schemas/typeConverter.schema'

export const hieroTransactionIdSchema = v.pipe(
  v.string(
    'expect hiero transaction id type, for example 0.0.141760-1755138896-607329203 or 0.0.141760@1755138896.607329203',
  ),
  v.regex(hieroTransactionIdRegex),
)

// allow TransactionIdentifier to only contain either transactionNr or iotaMessageId
export const transactionIdentifierSchema = v.pipe(
  v.object({
    transactionId: v.nullish(
      v.pipe(v.number('expect number type'), v.minValue(1, 'expect number >= 1')),
      undefined,
    ),
    hieroTransactionId: v.nullish(hieroTransactionIdSchema, undefined),
    communityId: v.string(),
    format: v.optional(v.literal('json'), 'json'),
  }),
  // biome-ignore lint/suspicious/noExplicitAny: cannot use TransactionIdentifierInput at this place
  v.custom((value: any) => {
    const setFieldsCount =
      Number(value.transactionId !== undefined) + Number(value.hieroTransactionId !== undefined)
    if (setFieldsCount !== 1) {
      return false
    }
    return true
  }, 'expect transactionNr or hieroTransactionId not both'),
)

export type TransactionIdentifierInput = v.InferInput<typeof transactionIdentifierSchema>
export type TransactionIdentifier = v.InferOutput<typeof transactionIdentifierSchema>

export const transactionsRangeSchema = v.object({
  // default value is 1, from first transactions
  fromTransactionId: v.nullish(v.pipe(v.number(), v.minValue(0, 'expect number >= 0')), 0),
  // default value is 100, max 100 transactions
  maxResultCount: v.nullish(v.pipe(v.number(), v.minValue(1, 'expect number >= 1')), 100),
  communityId: v.string(),
  format: v.optional(v.literal('Json'), 'Json'),
})

export type TransactionsRangeInput = v.InferInput<typeof transactionsRangeSchema>
export type TransactionsRange = v.InferOutput<typeof transactionsRangeSchema>

export const PaginationSchema = v.object({
  size: v.pipe(
    v.number(),
    v.minValue(0, 'expect number >= 0'),
    v.maxValue(100, 'expect number <= 100'),
  ),
  page: v.pipe(v.number(), v.minValue(0, 'expect number >= 0')),
})

export const TimepointIntervalSchema = v.object({
  startDate: dateStringSchema,
  endDate: dateStringSchema,
})

export const blockchainFilterSchema = v.object({
  searchDirection: v.optional(v.enum(SearchDirection), undefined),
  transactionType: v.optional(v.enum(TransactionType), undefined),
  publicKeySearchType: v.optional(v.enum(PublicKeySearchType), undefined),
  format: v.optional(v.enum(WireOutputFormat), undefined),
  communityId: v.optional(v.string(), undefined),
  coinCommunityId: v.optional(v.string(), undefined),
  maxTransactionNr: v.optional(v.number(), undefined),
  minTransactionNr: v.optional(v.number(), undefined),
  publicKey: v.optional(v.string(), undefined),
  pagination: v.optional(PaginationSchema, undefined),
  timepointInterval: v.optional(TimepointIntervalSchema, undefined),
})

export type BlockchainFilterInput = v.InferInput<typeof blockchainFilterSchema>
export type BlockchainFilter = v.InferOutput<typeof blockchainFilterSchema>

export const listTransactionsQuerySchema = v.object({
  communityId: v.string(),
  pubkey: v.string(),
  pageSize: v.nullish(
    v.pipe(
      v.number(),
      v.minValue(1, 'expect number >= 1'),
      v.maxValue(100, 'expect number <= 100'),
    ),
  ),
  currentPage: v.nullish(v.pipe(v.number(), v.minValue(1, 'expect number >= 1'))),
  orderDESC: v.nullish(v.union([v.literal('ASC'), v.literal('DESC')])),
  onlyCreations: v.nullish(v.boolean()),
})

export type ListTransactionsQueryInput = v.InferInput<typeof listTransactionsQuerySchema>
export type ListTransactionsQuery = v.InferOutput<typeof listTransactionsQuerySchema>
