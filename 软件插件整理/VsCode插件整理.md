#### 别名路径跳转

鼠标移动到路径上，按住`ctrl`并单击就会跳转

> 配置项可以写入`settings.json`中，来扩展插件的能力

* 路径映射，`/`表示项目根目录，示例

```json
"alias-skip.mappings": {
	"@":"/src"  // 默认只有`@`映射，映射到`/src`，你可以添加更多映射，映射路径必须以`/`开头
	// ...更多映射关系
}
  
```

* 可缺省后缀名的文件列表，以下文件不需要写后缀名

```json
"alias-skip.allowedsuffix": ["js","vue","jsx","ts"]  // 默认有这四项
```

* 判断项目根目录的依据，默认为`package.json`，即存在该文件的目录为项目根目录，例如小程序项目可以改成`app.json`

```json
"alias-skip.rootpath": "package.json"
```

#### Chinese vs汉化中文包

安装后，在 `locale.json` 中添加 `"locale": "zh-cn"`，即可载入中文（简体）语言包。要修改 `locale.json`，你可以同时按下 `Ctrl+Shift+P` 打开**命令面板**，之后输入 `"config"` 筛选可用命令列表，最后选择**配置语言**命令

