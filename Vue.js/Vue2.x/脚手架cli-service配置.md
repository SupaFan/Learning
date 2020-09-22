(https://www.jianshu.com/p/ce6f7264967a)

### CLI服务

在package.json使用默认预设的项目中看到的内容
```JavaScript
{
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  }
}
```

您可以使用npm或Yarn调用这些脚本：
```
npm run serve
# OR
yarn serve
```

如果您有[npx](https://github.com/zkat/npx)可用（应与最新版本的npm捆绑在一起），您还可以直接使用以下命令调用二进制文件：
```
npx vue-cli-service serve
```

### vue-cli-service serve

```
Usage: vue-cli-service serve [options]
Options:
  --open    服务器启动时打开浏览器
  --copy    将URL复制到服务器启动时的剪贴板 (直接到浏览器去粘贴就OK了 http://localhost:8080/)
  --mode    指定环境模式 (默认: development)
  --host    host 地址 (default: 0.0.0.0)
  --port    端口号 (default: 8080)
  --https   使用https (default: false)
```
### vue-cli-service build 

```
Usage: vue-cli-service build [options] [entry|pattern]
Options:
  --mode        指定环境模式 (default: production)
  --dest        指定输出目录 (default: dist)
  --modern      构建两个版本的 js 包：一个面向支持现代浏览器的原生 ES2015+ 包，以及一个针对其他旧浏览器的包。
  --target      允许您以项目库或Web组件的形式在项目内部构建任何组件 app | lib | wc | wc-async (default: app) ???
  --name        lib或者web组件库的名称 (default: "name" in package.json or entry filename)
  --no-clean    在构建项目之前不要删除输出目录(dist)
  --report      生成report.html以帮助分析包内容
  --report-json 生成report.json来帮助分析包内容
  --watch       监听 - 当有改变时 自动重新打包~
```
### vue-cli-service inspect
使用它 `vue-cli-service inspect` 来检查Vue CLI项目中的webpack配置。有关更多详细信息，请参阅[检查Webpack配置](https://cli.vuejs.org/guide/webpack.html#inspecting-the-project-s-webpack-config)

```
Usage: vue-cli-service inspect [options] [...paths]
Options:
  --mode    指定环境模式 (default: development)
```