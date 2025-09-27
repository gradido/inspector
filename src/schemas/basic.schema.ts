import * as v from 'valibot'
import { dateSchema } from './typeConverter.schema'

export const hieroTransactionIdRegex = new RegExp(/^[0-9]+\.[0-9]+\.[0-9]+(-[0-9]+-[0-9]+|@[0-9]+\.[0-9]+)$/)