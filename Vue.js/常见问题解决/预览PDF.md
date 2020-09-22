这儿用到的是 `vue-pdf` 这个组件 [https://github.com/FranckFreiburger/vue-pdf](https://github.com/FranckFreiburger/vue-pdf)

##### 使用方法

##### 1. 安装
`npm install --save vue-pdf`

##### 2. 遇到个小问题 `Missing file extension "vue" for "xxxx" (import/extensions)`
解决方案
2.1. 安装 eslint-import-resolver-webpack
`yarn add eslint-import-resolver-webpack`
2.2. 在.eslintrc.js中加入

```
settings: {
    'import/resolver': {
      webpack: {
        config: 'node_modules/@vue/cli-service/webpack.config.js',
      },
    },
  },
```
```
rules: {
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }]
  },
```
##### 3. 注册组件

```
import pdf from 'vue-pdf';
components: {
    pdf,
  },
```

##### 4. demo
```
<template>
<pdf
  src="http://192.168.201.188:8000/GreenSock-Cheatsheet-4.pdf"
  :page="currentPage"
  @num-pages="pageCount=$event"
  @page-loaded="currentPage=$event"
  @loaded="loadPdfHandler"
    ></pdf>
  <p class="page-control">
    <!-- 上一页 -->
    <span @click="changePdfPage(0)" :class="{'gray-btn': currentPage==1}">上一页</span>
    {{currentPage}} / {{pageCount}}
    <!-- 下一页 -->
    <span @click="changePdfPage(1)" :class="{'gray-btn': currentPage==pageCount}">下一页</span>
  </p>
</template>

methods: {
    changePdfPage(val) {
      // console.log(val)
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
        // console.log(this.currentPage)
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
        // console.log(this.currentPage)
      }
    },
    // pdf加载时
    loadPdfHandler(e) {
      this.currentPage = 1; // 加载的时候先加载第一页
    },
},
```


