// const StylelintPlugin = require('stylelint-webpack-plugin')
const path = require('path');
const resolve = (dir) => path.join(__dirname, dir);
const CompressionPlugin = require("compression-webpack-plugin")
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
// const TerserPlugin = require('terser-webpack-plugin')
const productionGzipExtensions = ['js', 'css'];
const cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js',
    'https://cdn.bootcss.com/vue/2.5.2/vue.min.js',
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.17.1/axios.min.js',
    'https://cdn.bootcss.com/mint-ui/2.2.13/index.js',
    'https://cdn.bootcss.com/crypto-js/3.1.9/crypto-js.min.js'
  ]
}
// const express = require('express')
// const app = express()
// var singer = require('./src/assets/data/index.json') //本地json文件数据
// var apiRoutes = express.Router();
// app.use('/getJson',apiRoutes)
module.exports = {
  pluginOptions: {
    dll: {
      entry: ['vue', 'vue-router', 'vuex', 'axios',
      "echarts",
      "v-charts",
      "date-fns",
      // "element-ui": "^2.13.0",
      // "font-awesome": "^4.7.0",
      "js-cookie",
      "qs"],
      output: path.join(__dirname, './public/dll'),
      cacheFilePath: path.resolve(__dirname, './public/dll'),
       // 是否开启 DllReferencePlugin,
      // 1. 如果你需要在开发环境中不采用开启分包模式，你可以配置open为false。
      // 例如，我们入口配置为 entry: ['vue']， 我们执行npm run dll 构建了vendor包。
      // 在npm run serve的时候，如果默认open开启的情况下，其实开发环境采用的vue是生产环境的包，因为我们dll命令构建的就是生产环境的包。
      // 这会让我们在开发环境中无法看到vue给我们带来的友好提示建议。
      // 我们可以配置open : process.env.NODE_ENV === 'production'，只在生产环境开启DllReferencePlugin
 
      // 2. 参数会自动识别是否有先执行npm run dll生产分包，如果没有的情况下则不开启dll。
      open: process.env.NODE_ENV === 'production',
       // 自动注入到index.html
      // 在构建其他命令的时候，如果开启了自动注入。程序会手动将output中生成的*.dll.js 文件自动注入到index.html中。
      inject: true,
    }
  },
  configureWebpack: config => {
    // 数据压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new CompressionPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240, // 对超过10k的数据压缩
        // deleteOriginalAssets: false, // 不删除源文件npm 
        minRatio: 0.8
      }))
      // CDN加速
      // config.externals = {
      //   'vue': 'Vue',
      //   // 'vue-router': 'VueRouter',
      //   'vuex': 'Vuex',
      //   'moment': 'moment',
      //   'axios': 'axios',
      //   'mint-ui': 'MINT',
      //   'crypto-js': 'CryptoJS'
      // }
      // 去除console
      // config.plugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         // warnings: false,
      //         drop_debugger: true,
      //         drop_console: true,
      //         pure_funcs: ['console.log'] //移除console
      //       },
      //     },
      //     sourceMap: false,
      //     parallel: true,
      //   })
      // )
      // 插件terser
      // config.plugins.push(
      //   new TerserPlugin({
      //     cache: true,
      //     parallel: true, // 多线程打开
      //     sourceMap: true, // Must be set to true if using source-maps in production
      //     terserOptions: {
      //       compress: {
      //         drop_console: true,
      //         drop_debugger: true
      //       }
      //     }
      //   })
      // )
      // 
    }

  },
  chainWebpack: config => {
    // 图片压缩
    // config.module
    //   .rule('images')
    //   .use('image-webpack-loader')
    //     .loader('image-webpack-loader')
    //     .tap(options => {
    //       // 修改它的选项...
    //       return options
    //     });
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'))
      .set('vendor', path.resolve(__dirname, 'src/vendor'))
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    // 移除 preload 插件
    config.plugins.delete('preload');
    // cdn注入
    // config.plugin('html')
    //   .tap(args => {
    //       args[0].cdn = cdn;
    //       args[1].cdn = cdn;
    //       return args;
    //   });
  },
  /* 部署生产环境和开发环境下的URL：可对当前环境进行区分，baseUrl 从 Vue CLI 3.3 起已弃用，要使用publicPath */
  /* baseUrl: process.env.NODE_ENV === 'production' ? './' : '/' */
  //   publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
  publicPath: './',
  /* 输出文件目录：在npm run build时，生成文件的目录名称 */
  outputDir: 'dist',
  /* 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录 */
  assetsDir: "assets",
  /* 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度 */
  //   productionSourceMap: false,
  /* 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存，你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变) */
  filenameHashing: false,
  /* 代码保存时进行eslint检测 */
  lintOnSave: true,
  // module: { // 所有第三方 模块的配置规则
  // rules: [ // 第三方匹配规则
  // 千万别忘记添加 exclude 排除项
  // { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ },
  // {
  //   test: /\.vue$/,
  //   loader: "vue-loader"
  // },{
  //   test: /\.css$/,
  //   use: ["vue-style-loader", "css-loader"]  
  // },
  // {
  //   test: /\.stylus$/,
  //   use: ['style-loader', 'css-loader', 'stylus-loader']
  // }
  // ]
  // },
  /* webpack-dev-server 相关配置 */
  devServer: {
    // before(app) {
    //   app.get('/getJson/singer', (req, res) => {
    //        res.json({              
    //            errno: 0,   // 这里是你的json内容
    //            data: singer
    //        })
    //    })
    // },
    /* 自动打开浏览器 */
    open: false,
    /* 设置为0.0.0.0则所有的地址均能访问 */
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false,
    /* 使用代理 */
    proxy: {
      '/api': {
        /* 目标代理服务器地址 */
        target: 'http://59.110.233.50:8762/',
        /* 允许跨域 */
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/new': {
        /* 目标代理服务器地址 */
        target: 'http://39.106.157.136:8003/',
        /* 允许跨域 */
        changeOrigin: true,
        pathRewrite: {
          '^/new': ''
        }
      },
      '/traff': {
        /* 目标代理服务器地址 */
        target: 'https://i.snssdk.com/',
        /* 允许跨域 */
        changeOrigin: true,
        pathRewrite: {
          '^/traff': ''
        }
      },
      '/gaism_server': {
        // target: 'http://39.106.157.136:8080/gaism-server/',
        target: 'http://39.106.157.136:9090/gaism-server/',
        // target: 'http://192.168.1.111:8080/gaism-server/',
        changeOrigin: true,
        pathRewrite: {
          '^/gaism_server': ''
        }
      },
      '/gmsso_server': {
        target: 'http://39.106.157.136:8081/gm-sso-server/',
        // target: 'http://192.168.1.111:8082/gm_sso_server_war/',
        changeOrigin: true,
        pathRewrite: {
          '^/gmsso_server': ''
        }
      },
      '/uums_server': {
        target: 'http://39.106.157.136:8081/uums-server/',
        // target: 'http://192.168.1.111:8098/uums_server_war/',
        changeOrigin: true,
        pathRewrite: {
          '^/uums_server': ''
        }
      },
      '/test': {
        // target: 'http://39.100.4.175:19286/uums-server/',
        target: 'http://39.100.34.183:8088/big-data-server/',
        changeOrigin: true,
        pathRewrite: {
          '^/test': ''
        }
      },
    },
  },
  transpileDependencies: [
    'vue2-org-tree'
  ]
}