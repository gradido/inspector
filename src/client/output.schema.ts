import * as v from 'valibot'
import { dateSchema } from '../schemas/typeConverter.schema'
import { AddressType } from '../enum/AddressType'
import { UserTransactionType } from '../enum/UserTransactionType'
import { confirmedTransactionSchema } from '../schemas/transaction.schema'
import { decaySchema, linkedUserSchema } from '../schemas/basic.schema'

export const listCommunitiesResultSchema = v.object({
  communities: v.array(v.string()),
  timeUsed: v.string(),
})

export type ListCommunitiesResult = v.InferOutput<typeof listCommunitiesResultSchema>


export const getTransactionResultSchema = v.object({
  transaction: confirmedTransactionSchema,
  timeUsed: v.string(),
})

export type GetTransactionResult = v.InferOutput<typeof getTransactionResultSchema>

export const getTransactionsResultSchema = v.object({
  transactions: v.array(confirmedTransactionSchema),
  timeUsed: v.string(),
  aufBalance: v.string(),
  gmwBalance: v.string(),
})

export type GetTransactionsResult = v.InferOutput<typeof getTransactionsResultSchema>

export const walletTransactionSchema = v.object({
  id: v.number(),
  typeId: v.enum(UserTransactionType),
  amount: v.string(),
  balance: v.string(),
  previousBalance: v.string(),
  memo: v.string(),
  linkedUser: linkedUserSchema,
  balanceDate: dateSchema,
  decay: v.nullish(decaySchema),
})

export type WalletTransaction = v.InferOutput<typeof walletTransactionSchema>

export const transactionListSchema = v.object({
  balance: v.string(),
//  balanceGDT: v.string(),
  count: v.number(),
//  linkCount: v.number(),
  addressType: v.enum(AddressType),
  transactions: v.array(walletTransactionSchema),
})

export type TransactionList = v.InferOutput<typeof transactionListSchema>

export const listTransactionsResultSchema = v.object({
  transactionList: transactionListSchema,
  timeUsed: v.string(),
})

export type ListTransactionsResult = v.InferOutput<typeof listTransactionsResultSchema>

