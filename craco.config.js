const CracoLessPlugin = require('craco-less');
const path = require('path');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const WebpackBar = require('webpackbar')
module.exports = {
  // webpack 配置
  webpack: {

    configure: (webpackConfig, { env, paths }) => {
      // 配置扩展扩展名
      webpackConfig.resolve.extensions = [
        ...webpackConfig.resolve.extensions,
        ...['.less', '.tsx', '.ts', '.js', '.jsx'],
      ]
      return webpackConfig;
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },

    plugins: [
      // 查看打包的进度
      new SimpleProgressWebpackPlugin(),
      // webpack构建进度条
      new WebpackBar({
        profile: true
      }),
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        // css module 也支持antd的引入
        cssLoaderOptions: {
          modules: {
            localIdentName: "[local]_[hash:base64:5]",
            // 回调必须返回 `local`，`global`，或者 `pure`
            mode: (resourcePath) => {
              if (/pure\.(less|css)$/i.test(resourcePath)) {
                return 'pure'
              }
              if (/(global)\.(less|css)$/i.test(resourcePath)) {
                return 'global'
              }
              if (/antd/i.test(resourcePath)) {
                return 'global'
              }
              return 'local'
            },
          }
        },
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],

  babel: {
    plugins: [
      // ["@babel/plugin-proposal-decorators", { legacy: true }],  //装饰器
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": true //设置为true即是less
        }
      ]
    ]
  },

};