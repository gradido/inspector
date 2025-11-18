import * as v from 'valibot'
import { AddressType } from '../enum/AddressType'
import { dateSchema } from './typeConverter.schema'
import { encryptedMemoSchema, hex32Schema, signaturePairSchema, transferAmountSchema } from './basic.schema'
import { CrossGroupType } from '../enum/CrossGroupType'

export const communityRootSchema = v.object({
  pubkey: hex32Schema,
  gmwPubkey: hex32Schema,
  aufPubkey: hex32Schema,
})

export type CommunityRoot = v.InferOutput<typeof communityRootSchema>

export const registerAddressSchema = v.object({
  userPubkey: hex32Schema,
  addressType: v.enum(AddressType),
  nameHash: hex32Schema,
  accountPubkey: hex32Schema,
  derivationIndex: v.number(),
})

export type RegisterAddress = v.InferOutput<typeof registerAddressSchema>

export const gradidoTransferSchema = v.object({
  sender: transferAmountSchema,
  recipient: hex32Schema,
})

export type GradidoTransfer = v.InferOutput<typeof gradidoTransferSchema> 

export const gradidoCreationSchema = v.object({
  recipient: transferAmountSchema,
  targetDate: dateSchema,
})

export type GradidoCreation = v.InferOutput<typeof gradidoCreationSchema>

export const gradidoDeferredTransferSchema = v.object({
  transfer: gradidoTransferSchema,
  timeout: v.string(),
})

export type GradidoDeferredTransfer = v.InferOutput<typeof gradidoDeferredTransferSchema>

export const gradidoRedeemDeferredTransferSchema = v.object({
  deferredTransferTransactionNr: v.number(),
  transfer: gradidoTransferSchema,
})

export type GradidoRedeemDeferredTransfer = v.InferOutput<typeof gradidoRedeemDeferredTransferSchema>

export const gradidoTimeoutDeferredTransferSchema = v.object({
  deferredTransferTransactionNr: v.number(),
})

export type GradidoTimeoutDeferredTransfer = v.InferOutput<typeof gradidoTimeoutDeferredTransferSchema>

export const transactionBodySchema = v.pipe(
  v.object({
    memos: v.array(encryptedMemoSchema),
    createdAt: dateSchema,
    versionNumber: v.string(),
    type: v.enum(CrossGroupType),
    otherGroup: v.nullish(v.string()),
    communityRoot: v.nullish(communityRootSchema),
    registerAddress: v.nullish(registerAddressSchema),
    creation: v.nullish(gradidoCreationSchema),
    transfer: v.nullish(gradidoTransferSchema),
    deferredTransfer: v.nullish(gradidoDeferredTransferSchema),
    redeemDeferredTransfer: v.nullish(gradidoRedeemDeferredTransferSchema),
    timeoutDeferredTransfer: v.nullish(gradidoTimeoutDeferredTransferSchema),
  }),
  v.custom((value: any) => {
    const setFieldsCount =
        Number(value.communityRoot !== undefined) 
      + Number(value.registerAddress !== undefined)
      + Number(value.creation !== undefined)
      + Number(value.transfer !== undefined)
      + Number(value.deferredTransfer !== undefined)
      + Number(value.redeemDeferredTransfer !== undefined)
      + Number(value.timeoutDeferredTransfer !== undefined)
    if (setFieldsCount !== 1) {
      return false
    }
    return true
  }, 'expect only one of communityRoot, registerAddress, creation, transfer, deferredTransfer, redeemDeferredTransfer or timeoutDeferredTransfer'),
)

export type TransactionBody = v.InferOutput<typeof transactionBodySchema>

export const gradidoTransactionSchema = v.object({
  signatureMap: v.array(signaturePairSchema),
  bodyBytes: transactionBodySchema,
})

export const accountBalanceSchema = v.object({
  pubkey: hex32Schema,
  balance: v.string(),
  communityId: v.nullish(v.string()),
})

export type AccountBalance = v.InferOutput<typeof accountBalanceSchema>

export const confirmedTransactionSchema = v.object({
  id: v.number(),
  gradidoTransaction: gradidoTransactionSchema,
  confirmedAt: dateSchema,
  versionNumber: v.string(),
  runningHash: hex32Schema,
  messageId: v.string(),
  accountBalances: v.array(accountBalanceSchema),
})

export type ConfirmedTransaction = v.InferOutput<typeof confirmedTransactionSchema>