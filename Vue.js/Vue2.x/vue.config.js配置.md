- baseUrl  
`baseUrl: process.env.NODE_ENV === 'production'? '/static' : '/',`


- 打包后的输出目录
`outputDir: '../static',`

- 静态资源打包地址
 `assetsDir: './assets',`

- 保存时是不是用eslint-loader 来lint 代码
`lintOnSave: true,`

- page 配置
```pages: {
    index: {
      // 入口文件
      entry: './src/main.js',
      // 模版文件
      template: 'public/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },
```
- 是否使用包含运行时编译器的Vue内核版本
`runtimeCompiler: true,`

- 使用runtime-only 还是 in-browser compiller
`compiler: false,`


- webpack 配置~
  `chainWebpack: () => {},`
  `configureWebpack: () => {},`

 - vue-loader  配置
[https://vue-loader.vuejs.org/en/options.html](https://vue-loader.vuejs.org/en/options.html)
`vueLoader: {},`


- 生产环境的sourceMap 要不要？ 默认 true
`productionSourceMap: true,`

- CSS 相关
```
  css: {
    // 是否提取css生成单独的文件 默认 true
    extract: true,
    // 使用 CSS source maps?
    sourceMap: false,
    // loader配置
    loaderOptions: {},
    // 使用 css Modules
    modules: false
  },
```
- 使用多线程否？
 ` parallel: require('os').cpus().length > 1,`


 - 使用 autoDLLPlugin
` dll: false,`

  [https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa)
-pwa 相关
`pwa: {},`

 - dev server 相关配置
> 如果使用package devsever 配置无法热更新
```
  devServer: {
    host: '192.168.54.107',
    port: 8071,
    https: false,
    hotOnly: true,
   proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true
      },
      '/foo': {
        target: '<other_url>'
      }
    }
  }
```
> 这里说一下热更新有可能失效的问题
 1. 用npm 安装 
 2. server配置写在config.js里面 在package里面会失效