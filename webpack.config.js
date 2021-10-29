const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'museum'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.sass$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },

          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg)?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './assets/styles/style.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        'src/index.html',
        {
          from: 'src/assets/img',
          to: 'assets/img',
        },
        {
          from: 'src/assets/fonts',
          to: 'assets/fonts',
        },
        {
          from: 'src/assets/styles',
          to: 'assets/styles',
        },
        {
          from: 'src/assets/video',
          to: 'assets/video',
        },
        {
          from: 'src/assets/video/controls',
          to: 'assets/video/controls',
        },
        {
          from: 'src/assets/favicon.ico',
          to: 'assets',
        },
        {
          from: 'src/assets/svg',
          to: 'assets/svg',
        },
        {
          from: 'src/assets/tours',
          to: 'assets/tours',
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'museum'),
    },
    compress: true,
    port: 3000,
  },
};
