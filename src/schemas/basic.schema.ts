import * as v from 'valibot'
import { dateSchema } from './typeConverter.schema'
import { MemoKeyType } from '../enum/MemoKeyType'

export const hieroTransactionIdRegex = new RegExp(/^[0-9]+\.[0-9]+\.[0-9]+(-[0-9]+-[0-9]+|@[0-9]+\.[0-9]+)$/)

export const hex32Schema = v.pipe(
  v.pipe(
    v.string('expect string type'),
    v.hexadecimal('expect hexadecimal string'),
    v.length(64, 'expect string length = 64'),
  )
)

export const transferAmountSchema = v.object({
  pubkey: hex32Schema,
  amount: v.string(),
  communityId: v.nullish(v.string()),
})

export const signaturePairSchema = v.object({
  pubkey: hex32Schema,
  signature: v.pipe(
    v.string('expect string type'),
    v.hexadecimal('expect hexadecimal string'),
    v.length(128, 'expect string length = 128'),
  ),
})

export const encryptedMemoSchema = v.object({
  type: v.enum(MemoKeyType),
  memo: v.string(),
})

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

export type Decay = v.InferOutput<typeof decaySchema>

