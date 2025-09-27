
import * as v from 'valibot'
import { stringToNumberSchema } from '../schemas/typeConverter.schema'

export enum NodeEnvironmentType {
  Development = 'development',
  Production = 'production',
}

export const configSchema = v.object({
  PRODUCTION: v.exactOptional(v.boolean(), false),
  NODE_ENV: v.exactOptional(v.pipe(v.string(), v.enum(NodeEnvironmentType)), NodeEnvironmentType.Development),

  NODE_SERVER_URL: v.pipe(v.string(), v.url()),
  AUTO_POLL_INTERVAL: v.exactOptional(v.config(
    v.pipe(stringToNumberSchema, v.minValue(0), v.maxValue(60000)),
    { message: 'The interval for auto polling in milliseconds need to be between 0 and 60000' }
  ), 0),
})  