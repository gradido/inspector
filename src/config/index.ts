import { parse, InferOutput, ValiError } from 'valibot'
import { configSchema, NodeEnvironmentType } from './schema'

type ConfigOutput = InferOutput<typeof configSchema>

let config: ConfigOutput
try {
  config = parse(configSchema, process.env)
  console.log(config)
  config.PRODUCTION = config.NODE_ENV === NodeEnvironmentType.Production
} catch (error: Error | unknown) {
  if (error instanceof ValiError) {
    throw new Error(`${error.issues[0].path[0].key}: ${error.message} received: ${error.issues[0].received}`)
  } else {
    throw error
  }
}

export const CONFIG = config
