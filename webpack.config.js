const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'development',
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'class-transformer': path.resolve(__dirname, 'node_modules/class-transformer/esm5/index.js')
    }
  },
  module: {
    rules: [
      // SCSS Loader
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                quietDeps: true
              }
            }
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // less loader
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.min.css',
      chunkFilename: '[id].[contenthash].css',
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
  optimization: {
    minimize: true, 
    minimizer: [
      new CssMinimizerPlugin({
        test: /\.css$/i, 
        minimizerOptions: {
          preset: [
            'default', 
            {
              discardComments: { removeAll: true }, 
            },
          ],
        },
      }),
    ],
  },
}
