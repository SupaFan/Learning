## 一、业务场景

前端本地开发的场景中，我们需要频繁的改动代码，并需要实时看到效果，并且在一些开发场景中，我们需要将特定的请求代理到特定的IP、本地文件等，所以使用fiddler或whistle等本地、真机抓包调试工具是非常必要的。

## 二、为什么使用whistle

在历史的长河中，我们是使用fiddler+willow再搭配小米wifi 进行本地和真机抓包调试的，无可厚非，fiddler的抓包和代理的功能十分强大，但在使用的过程中，有个很蛋疼的缺点就是内存泄漏！！fiddler挂一整天，内存就被吃完了，然后电脑变得巨卡无比，即使加了个内存条也是治标不治本，这时候只能使用重启fiddler大法来解决，但是，长期的折磨使我萌生了有没有工具可以替代fillder的想法。于是乎，我发现了whistle。试用了一段时间后，发现它能替代fiddler完成我们日常的开发工作，并且在某些方面whistle做的更好，下面就分享一下whistle的使用实践。

## 三、安装启动

### 1. 安装

```
 npm install  -g  whistle   //也可以使用tnpm
 
 w2 -h  //帮助信息
```

### 2. 启动

```
w2 start -p 8899 //不设置端口默认使用8899
```

更多命令：[安装启动](https://whistle.gitbooks.io/help/content/install.html)
启动完成后在chorme下打开 127.0.0.1:8899 可以看到这么一个页面：

![clipboard.png](https://segmentfault.com/img/bVbfxMx)

但是现在还无法抓包，需要为浏览器设置代理。

### 3. 为浏览器配置代理

- [whistle-for-chrome插件](https://github.com/avwo/whistle-for-chrome)
- [SwitchyOmega](https://github.com/FelisCatus/SwitchyOmega)

以上2款chorme插件二选一，我使用的是SwitchyOmega , 将浏览器代理到8899端口
!
![clipboard.png](https://segmentfault.com/img/bVbfxME)

配置完成后再看whistle的控制台，此时已经能抓到请求了：

![clipboard.png](https://segmentfault.com/img/bVbfxMK)

## 四、基础功能

我们最常使用的就是NetWork 和 Rules 功能了, 其中NetWork是查看抓包，而Rules是设置代理，下面我以一个移动端活动为例，介绍一下whistle的使用：

### 1、界面功能：

#### a.创建并启用一个代理选项：

![clipboard.png](https://segmentfault.com/img/bVbfxN4)

#### b. 启用多个代理选项

![clipboard.png](https://segmentfault.com/img/bVbfxN5)

更多界面功能详见：[界面列表](https://whistle.gitbooks.io/help/content/webui/)

### 2、 匹配模式：

#### a. 基本匹配:

```
# 匹配域名www.qq.com下的所有请求
www.qq.com operatorURI

# 匹配域名www.qq.com下的所有http请求
http://www.qq.com operatorURI

# 匹配域名www.qq.com下的所有https请求
https://www.qq.com operatorURI

# 限定域名的端口号
www.qq.com:8888 operatorURI # 8888端口

#限定具体路径
http://www.qq.com/xxx operatorURI

# 精确匹配 ， 以$符号开头
$http://www.qq.com/xxx operatorURI
```

#### b. 正则匹配：

```
 /http:\/\/(.*)/  log://
```

#### c. 通配符匹配

```
# 通配符匹配，以 ^ 开头(如果需要限制结束位置可以用 $)，* 为通配符

^www.example.com/test/***   operatorURI


# 通配域名匹配：
# 匹配二级域名以 .com 结尾的所有url，如: test.com, abc.com，但不包含 *.xxx.com
*.com   operatorURI
//*.com  operatorURI


# 通配路径匹配：
# 对所有域名对应的路径 protocol://a.b.c/xxx[/yyy]都生效
*/  operatorURI
*/xxx  operatorURI
```

更多匹配模式详见：[匹配模式](https://whistle.gitbooks.io/help/content/pattern.html)

### 3、代理协议：

#### a. file：

```
http://www.qq.com/pgg_act/ D:\dev\
```

将此路径的请求都代理到本地D:dev 目录下。

#### b. HOST ：

```
10.241.11.111 www.qq.com
```

将www.qq.com的请求都代理到10.241.11.111 IP上，实现在本地环境发测试环境的请求，

#### c. 抓取 HTTPS ：

whistle支持抓取https 请求，具体配置方法参见：[HTTPS拦截](https://whistle.gitbooks.io/help/content/webui/https.html)

#### d. 请求替换：

在php接口开发中，我们需要将jsonp请求代理到自己的开发机，使用请求替换可以达到目的（类似fillder的extention）：

```
http://www.qq.com http://www.baidu.com
```

以上几个协议基本能瞒足日常的开发，当然这只是强大的whistle的冰山一角，更多代理功能参见：[协议列表](https://whistle.gitbooks.io/help/content/rules/)

### 五、进阶

#### 1. 真机调试：

搭配小米wifi ，配置代理后便可抓取真机的包，在右上角online 按钮可查询到对应的代理服务器和端口：

![clipboard.png](https://segmentfault.com/img/bVbfxN3)

#### 2. 使用 log 功能打印日志：

在移动端真机调试中，我们无法像浏览器控制台那样，查看输出的日志和数据，以往的替代方案是在页面上使用**vconsole**插件，而有了whistle后，我们可以这样做：

```
/http://www.baidu.com/ log://
```

这时候不管是PC还是真机，只要是访问 [http://www.baidu.com](http://www.baidu.com/) 匹配方式下的页面，都可以在whistle的log选项下看到控制台输出的信息：
![img](http://imweb-io-1251594266.file.myqcloud.com/FnjMsJAaJffOLKkY9mpNRHttQ9ck)

#### 3. 使用 values + js 功能往页面注入 vconsole.js ：

我们在values功能栏下新建一个vConsole.js , 并把vconsole的源码放进去，并初始化一个vconsole对象,此时在rules 下配置：

```
http://www.baidu.com js://{vConsole.js}
```

此时，我们刷新页面可以看到：
![img](http://imweb-io-1251594266.file.myqcloud.com/FjxyNzaJkU4Ky7_eoMn0upzNB4Rq)

#### 4. 使用whistle内置的Weinre调试移动端页面：

weinre相信大家都很熟悉，而whistle内置了weinre，使用方法如下：
在rules配置：

```
http://www.qq.com weinre://test.js
```

这时候，就能在[http://127.0.0.1](http://127.0.0.1/):8899/weinre/client/#test 看到调试界面了：

![clipboard.png](https://segmentfault.com/img/bVbfxNP)

ps: 这东西不是很好用~

#### 5. 一个小技巧：

由于whistle是web的控制台，这时候我们在chorme 下面将 127.0.0.1：8899 添加到桌面。就能像软件一下使用这个控制台拉~

### 六、不止于此

whistle还有许多实用的功能，盗个官网的图：
![请在这里填写图片描述](https://segmentfault.com/img/remote/1460000016058880?w=1829&h=1725)

其中，重点介绍介绍一下：

- mock数据： [利用whistle mock数据](https://segmentfault.com/a/1190000014185370)
- 自定义插件 ： [插件开发](https://whistle.gitbooks.io/help/content/plugins.html)

### 七、使用体会

whistle 基于Node实现的跨平台（包括不限于:windows、mac）web调试代理工具，相较于fiddler ， 从使用体验来说，前者对于前端开发者更友好，但毕竟是web端的操作页面，较fiddler来说没有那么稳定。但whistle的安装简便，配置简单，比起fiddler那繁琐的配置过程真的是完爆。从功能上说，fiddler有的whistle都支持，并且对于真机调试更为方便，待挖掘的功能也更多。
附上github地址：https://github.com/avwo/whistle