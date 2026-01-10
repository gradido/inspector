import * as v from 'valibot'
import { LedgerAnchorType } from '../enum/LedgerAnchorType'
import { MemoKeyType } from '../enum/MemoKeyType'
import { dateSchema } from './typeConverter.schema'

export const hieroTransactionIdRegex = new RegExp(
  /^[0-9]+\.[0-9]+\.[0-9]+(-[0-9]+-[0-9]+|@[0-9]+\.[0-9]+)$/,
)

export const hex32Schema = v.pipe(
  v.pipe(
    v.string('expect string type'),
    v.hexadecimal('expect hexadecimal string'),
    v.length(64, 'expect string length = 64'),
  ),
)

export const positiveNumberSchema = v.pipe(v.number('expect number type'), v.minValue(0))
export const positiveNumberStringSchema = v.pipe(
  v.string('expect string type'),
  v.custom((value: unknown) => {
    const number = Number(value)
    return !Number.isNaN(number) && number >= 0
  }, 'expect positive number'),
)

export const hieroTransactionIdSchema = v.pipe(
  v.string('expect string type'),
  v.regex(hieroTransactionIdRegex, 'expect hiero transaction id'),
)

export const transferAmountSchema = v.object({
  pubkey: hex32Schema,
  amount: positiveNumberStringSchema,
  communityId: v.nullish(v.string()),
})

export type TransferAmount = v.InferOutput<typeof transferAmountSchema>

export const signaturePairSchema = v.object({
  pubkey: hex32Schema,
  signature: v.pipe(
    v.string('expect string type'),
    v.hexadecimal('expect hexadecimal string'),
    v.length(128, 'expect string length = 128'),
  ),
})

export type SignaturePair = v.InferOutput<typeof signaturePairSchema>

export const encryptedMemoSchema = v.object({
  type: v.enum(MemoKeyType),
  memo: v.string(),
})

export type EncryptedMemo = v.InferOutput<typeof encryptedMemoSchema>

export const linkedUserSchema = v.object({
  pubkey: hex32Schema,
  firstName: v.string(),
  lastName: v.string(),
})

export type LinkedUser = v.InferOutput<typeof linkedUserSchema>

export const decaySchema = v.object({
  decay: v.string(),
  duration: positiveNumberSchema,
  end: dateSchema,
  start: dateSchema,
})

export type Decay = v.InferOutput<typeof decaySchema>

export const ledgerAnchorSchema = v.pipe(
  v.object({
    type: v.enum(LedgerAnchorType),
    value: v.nullish(v.pipe(v.union([
      v.string(),
      v.number(),
    ]), v.transform((value: any): string => {
      if (typeof value === 'number') {
        return value.toString()
      }
      return value
    }))),
  }),
)

export type LedgerAnchor = v.InferOutput<typeof ledgerAnchorSchema>
