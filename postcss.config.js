// import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss'
const { purgeCSSPlugin } = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    purgeCSSPlugin({
      content: [
        './**/*.html',
        './src/**/*.ts'
      ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
    })
  ]
}
