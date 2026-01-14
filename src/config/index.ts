import * as v from 'valibot'
import { configSchema, NodeEnvironmentType } from './schema'

type ConfigOutput = v.InferOutput<typeof configSchema>

let config: ConfigOutput
try {
  config = v.parse(configSchema, {
    // These environment variables must be referenced as static property accesses,
    // because Vite replaces `process.env.<NAME>` with their actual string values at build time.
    // Dynamic property access (e.g. `process.env[key]`) would not be replaced and remain undefined in the browser.
    PRODUCTION: process.env.NODE_ENV === NodeEnvironmentType.Production,
    NODE_ENV: process.env.NODE_ENV,
    DLT_NODE_SERVER_URL: process.env.DLT_NODE_SERVER_URL,
    AUTO_POLL_INTERVAL: process.env.AUTO_POLL_INTERVAL,
    FULL_DECIMAL_PLACES: process.env.FULL_DECIMAL_PLACES,
  })
} catch (error: unknown) {
  if (error instanceof v.ValiError) {
    throw new Error(
      `${error.issues[0].path[0].key}: ${error.message} received: ${error.issues[0].received}`,
    )
  } else {
    throw error
  }
}

export const CONFIG = config
