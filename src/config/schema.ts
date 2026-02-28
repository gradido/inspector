import * as v from 'valibot'
import { stringToNumberSchema } from '../schemas/typeConverter.schema'

export enum NodeEnvironmentType {
  Development = 'development',
  Production = 'production',
}

const booleanSchema = v.pipe(v.string(), v.transform<string, boolean>((input) => {
  return input.toLowerCase() === 'true' || input === '1' || input.toLowerCase() === 'yes'
}))

export const configSchema = v.object({
  PRODUCTION: v.exactOptional(v.boolean(), false),
  NODE_ENV: v.exactOptional(
    v.pipe(v.string(), v.enum(NodeEnvironmentType)),
    NodeEnvironmentType.Development,
  ),

  DLT_NODE_SERVER_URL: v.optional(v.pipe(v.string(), v.url()), 'http://localhost:8340/api'),
  AUTO_POLL_INTERVAL: v.exactOptional(
    v.config(v.pipe(stringToNumberSchema, v.minValue(0), v.maxValue(60000)), {
      message: 'The interval for auto polling in milliseconds need to be between 0 and 60000',
    }),
    0,
  ),
  FULL_DECIMAL_PLACES: v.optional(booleanSchema, 'false'),
  HIERO_BLOCKCHAIN_EXPLORER_URL_TRANSACTION_DETAILS: v.optional(
    v.pipe(v.string(), v.url()),
    'https://hashscan.io/testnet/transaction/',
  ),
})
