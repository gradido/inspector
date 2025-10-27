import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolve from 'unplugin-icons/resolver'
import EnvironmentPlugin from 'vite-plugin-environment'
import { createHtmlPlugin } from 'vite-plugin-html'
import pluginPurgeCss from '@mojojoejo/vite-plugin-purgecss'
import * as v from 'valibot'
import { configSchema } from './src/config/schema'

import dotenv from 'dotenv'

dotenv.config() // load env vars from .env

import { stringToNumberSchema } from './src/schemas/typeConverter.schema'

const inspectorPortSchema = v.exactOptional(v.config(
  v.pipe(stringToNumberSchema, v.minValue(1024), v.maxValue(65535)),
  { message: 'The port on which to run the inspector with vite need to be between 1024 and 65535' }
), 3100)

// META TAGS FOR index.html
const metaTags = v.object({
  META_TITLE_DE: v.exactOptional(v.string(), 'Gradido Blockchain Inspektor'),
  META_TITLE_EN: v.exactOptional(v.string(), 'Gradido Blockchain Inspector'),
  META_DESCRIPTION_DE: v.exactOptional(v.string(), 'Analysiere Transaktionen auf der Gradido Blockchain'),
  META_DESCRIPTION_EN: v.exactOptional(v.string(), 'Analyze transactions on the Gradido Blockchain'),
  META_AUTHOR: v.exactOptional(v.string(), 'Gradido-Akademie'),
  META_URL: v.pipe(v.string(), v.url()),
})

export default defineConfig(() => {
  const config = v.parse(configSchema, process.env)
  const metaTagsConfig = v.parse(metaTags, process.env)
  return {
    base: '/inspector/',
    server: {
      host: '0.0.0.0',
      port: v.parse(inspectorPortSchema, process.env.INSPECTOR_PORT),
      fs: {
        strict: true,
      },
    },
    plugins: [
      createHtmlPlugin({
        minify: config.PRODUCTION,
        inject: {
          data: {
            VITE_META_TITLE_DE: metaTagsConfig.META_TITLE_DE,
            VITE_META_TITLE_EN: metaTagsConfig.META_TITLE_EN,
            VITE_META_DESCRIPTION_DE: metaTagsConfig.META_DESCRIPTION_DE,
            VITE_META_DESCRIPTION_EN: metaTagsConfig.META_DESCRIPTION_EN,
            VITE_META_AUTHOR: metaTagsConfig.META_AUTHOR,
            VITE_META_URL: metaTagsConfig.META_URL,
          },
        },
      }),
      pluginPurgeCss({
        variables: true,
      }),
      Components({
        resolvers: [IconsResolve()],
        dts: true,
      }),
      Icons({compiler:'raw'}),
      EnvironmentPlugin({
        DLT_NODE_SERVER_URL: config.DLT_NODE_SERVER_URL,
        AUTO_POLL_INTERVAL: config.AUTO_POLL_INTERVAL.toString(),
      }),
      // commonjs(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@use "@/assets/scss/custom/gradido-custom/color" as *;`,
        },
      },
    },
    build: {
      outDir: resolve(__dirname, './build'),
      chunkSizeWarningLimit: 1600,
      sourcemap: true,
    },
  }
})

