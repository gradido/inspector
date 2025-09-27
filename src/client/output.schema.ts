import * as v from 'valibot'
import { dateSchema } from '../schemas/typeConverter.schema'
import { hex32Schema, hex64Schema } from '../schemas/typeGuard.schema'
import { AddressType } from '../enum/AddressType'
import { TransactionType } from '../enum/TransactionType'
import { UserTransactionType } from '../enum/UserTransactionType'

export const listCommunitiesResultSchema = v.object({
  communities: v.array(v.string()),
  timeUsed: v.string(),
})

export type ListCommunitiesResult = v.InferOutput<typeof listCommunitiesResultSchema>

export const transferAmountSchema = v.object({
  pubkey: hex32Schema,
  amount: v.string(),
  communityId: v.string(),
})

export const signaturePairSchema = v.object({
  pubkey: hex32Schema,
  signature: hex64Schema,
})

export const signatureMapSchema = v.object({
  sigPair: v.array(signaturePairSchema),
})

export const communityRootSchema = v.object({
  pubkey: hex32Schema,
  gmwPubkey: hex32Schema,
  aufPubkey: hex32Schema,
})

export const registerAddressSchema = v.object({
  userPubkey: hex32Schema,
  addressType: v.enum(AddressType),
  nameHash: hex32Schema,
  accountPubkey: hex32Schema,
  derivationIndex: v.number(),
})

export const gradidoTransferSchema = v.object({
  sender: transferAmountSchema,
  recipient: hex32Schema,
})

export const gradidoCreationSchema = v.object({
  recipient: transferAmountSchema,
  targetDate: dateSchema,
})

export const gradidoDeferredTransferSchema = v.object({
  transfer: gradidoTransferSchema,
  timeout: dateSchema,
})

export const gradidoRedeemDeferredTransferSchema = v.object({
  deferredTransferTransactionNr: v.number(),
  transfer: gradidoTransferSchema,
})

export const gradidoTimeoutDeferredTransferSchema = v.object({
  deferredTransferTransactionNr: v.number(),
})

export const transactionBodySchema = v.object({
  memo: v.string(),
  createdAt: dateSchema,
  versionNumber: v.string(),
  type: v.enum(TransactionType),
  otherGroup: v.string(),
  communityRoot: communityRootSchema,
  registerAddress: registerAddressSchema,
  creation: gradidoCreationSchema,
  transfer: gradidoTransferSchema,
  deferredTransfer: gradidoDeferredTransferSchema,
  redeemDeferredTransfer: gradidoRedeemDeferredTransferSchema,
  timeoutDeferredTransfer: gradidoTimeoutDeferredTransferSchema,
})

export type TransactionBody = v.InferOutput<typeof transactionBodySchema>

export const gradidoTransactionSchema = v.object({
  signatureMap: signatureMapSchema,
  bodyBytes: v.object({json: transactionBodySchema}),
})

export const confirmedTransactionSchema = v.object({
  id: v.number(),
  gradidoTransaction: gradidoTransactionSchema,
  confirmedAt: dateSchema,
  versionNumber: v.string(),
  runningHash: hex32Schema,
  messageId: v.string(),
})

export type ConfirmedTransaction = v.InferOutput<typeof confirmedTransactionSchema>

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

export const linkedUserSchema = v.object({
  pubkey: hex32Schema,
  firstName: v.string(),
  lastName: v.string(),
})

export type LinkedUser = v.InferOutput<typeof linkedUserSchema>

export const decaySchema = v.object({
  decay: v.string(),
  duration: v.number(),
  end: dateSchema,
  start: dateSchema,
})

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

