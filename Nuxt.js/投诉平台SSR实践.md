# 颂车网投诉平台SSR实践

#### 文档 

nuxtjs 官方文档 https://zh.nuxtjs.org/

vant 官方文档 https://vant-contrib.gitee.io/

项目地址 http://dev.supoort.songcw.com/check

### 目标

平台因为有pc和mobile版本，技术方案可选

1、 媒体查询 pc + mobile 布局的时候就要考虑如何兼容

2、做两套 考虑的东西比较少，但是以后维护要稍微麻烦一点

用`vant` 主要是为了兼容手机 最终用一套页面实现兼容

### 实现

组件实现

* ImageView 图片预览组件 基于 `v-viewer` 实现 兼容PC+mobile
* ImageUploadZip 图片压缩 上传 预览 等
* css动画

基础搭建

* 路由

* 封装 axios && asyncData 

* sass-loader


  ```
  yarn node-sass sass-loader scss-loader --save-dev
  ```

* less-loader 跟sass-loader一样
* 全局css引入

```javascript
css: [{ src: '~assets/css/main.scss', lang: 'scss' }]
// 这玩意儿相当于混入
styleResources: {
    scss: '~assets/css/mixins.scss',//scss 
  },
```

* 环境变量

  ```json
   "dev": "cross-env NODE_ENV=dev BASE_URL=http://192.168.200.244:7010/  nuxt",
   "dev:uat": "cross-env NODE_ENV=uat BASE_URL=http://gateway2.songchejr.com/ nuxt",
   "dev:sit": "cross-env NODE_ENV=sit BASE_URL=https://gateway.songchejr.com/  nuxt",
   "build": "cross-env NODE_ENV=production BASE_URL=https://gateway.songchewang.com  nuxt build",
   "build:sit": "cross-env NODE_ENV=sit BASE_URL=https://gateway.songchejr.com/  nuxt build",
   "build:uat": "cross-env NODE_ENV=uat BASE_URL=http://gateway2.songchejr.com/  nuxt build",
  ```

* 插件的和组件的引入和vue差异


```
import Vue from 'vue'
import Login from "~/components/Login";
Vue.component('Login', Login)
```

```
import Vue from 'vue'
import Viewer from 'v-viewer'
Vue.use(Viewer,{
  defaultOptions: {
    zIndex: 9999
  }
});
```

```javascript
plugins: [
	'@/plugins/vant',
	'@/plugins/select',
	'@/plugins/viewer',
	'@/plugins/login',
	'~/libs/mixins.js'
],
```

### SEO 相关

* TDK

* 图片 内容 内联

* robot 

* sitemap 

* 权重

* 相关工具

  爱站 https://www.aizhan.com/

  5188 https://www.5118.com/

  重复文章查询

  伪原创

### 待更新

统计（百度监测 || cnzz）

http://sit.supoort.songcw.com/

