# 1.比较http 0.9和http 1.0

1. http0.9只是一个简单的协议，只有一个GET方法，没有首部，目标用来获取HTML。
2. HTTP1.0协议大量内容：首部，响应码，重定向，错误，条件请求，内容编码等。

http0.9流程：

> 客户端，构建请求，通过DNS查询IP地址，三次握手建立TCP连接，客户端发起请求，服务器响应，四次挥手，断开TCP连接。（与服务器只有一个来回）

http1.0流程：

> 客户端，构建请求，通过DNS查询IP地址，三次握手建立TCP连接，客户端发起请求，服务器响应，四次挥手，断开TCP连接。（与服务器有两个来回）

因为不足缺陷，就有了http1.1。

# 2.关于http1.1以及http2

http1.1中浏览器再也不用为每个请求重新发起TCP连接了，增加内容有：缓存相关首部的扩展，OPTIONS方法，Upgrade首部，Range请求，压缩和传输编码，管道化等。但还是满足不了现在的web发展需求，so，就有了http.2版本。

http2解决了（管道化特性可以让客户端一次发送所有的请求，但是有些问题阻碍了管道化的发展，即是某个请求花了很长时间，那么**队头阻塞**会影响其他请求。）http中的队头阻塞问题。

使用http2会比http1.1在使用TCP时，用户体验的感知多数延迟的效果有了量化的改善，以及提升了TCP连接的利用率（并行的实现机制不依赖与服务器建立多个连接）

所以需要学习http2，了解更过的内容来掌握计算机网咯。

对于http2，你可以来运行一个http2的服务器，获取并安装一个http2的web服务器，下载并安装一张**TLS**证书，让浏览器和服务器通过http2来连接。（从数字证书认证机构申请一张证书）。

了解http2的协议，先让我们了解一下web页面的请求，就是用户在浏览器中呈现的效果，发生了些什么呢？

> 资源获取的步骤：

把待请求URL放入队列，判断URL是否已在请求队列，否的话就结束，是的话就判断请求域名是否DNS缓存中，没有的话就解析域名，有的话就到指定域名的TCP连接是否开启，没有的话就开启TCP连接，进行HTTPS请求，初始化并完成TLS协议握手，向页面对应的URL发送请求。

> 接收响应以及页面渲染步骤：

接收请求，判断是否HTML页面，是就解析HTML，对页面引用资源排优先级，添加引用资源到请求队列。（如果页面上的关键资源已经接收到，就开始渲染页面），判断是否有还要继续接收资源，继续解析渲染，直到结束。

# 3.HTTP的几种请求方法用途

第一种GET方法：发送一个请求来获取服务器上的某一些资源。

第二种POST方法：向URL指定的资源提交数据或附加新的数据。

第三种PUT方法：跟POST方法一样，可以向服务器提交数据，但是它们之间也所有不同，PUT指定了资源在服务器的位置，而POST没有哦。

第四种HEAD方法：指请求页面的首部。

第五种DELETE方法：删除服务器上的某资源。

第六种OPTIONS方法：它用于获取当前URL所支持的方法，如果请求成功，在Allow的头包含类似GET,POST等的信息。

第七种TARCE方法：用于激发一个远程的，应用层的请求消息回路。

第八种CONNECT方法：把请求连接转换到TCP/TP通道。

# 4.从浏览器地址栏输入url到显示页面的步骤

简单说说，浏览器根据请求的url交给dns域名解析，查找真正的ip地址，向服务器发起请求；服务器交给后台处理后，返回数据，浏览器会接收到文件数据，比如，html,js，css，图像等；然后浏览器会对加载到的资源进行语法解析，建立相应的内部数据结构；载入解析到的资源文件，渲染页面，完成显示页面效果。

不够清楚明白码？

那就再次详细一下，咳咳，从浏览器接收url，开始进行网络请求线程，发出一个完整的HTTP请求，从服务器端接收请求到对应的后台接收到请求，然后是后台和前台的http交互；其中的缓存问题（http的缓存），浏览器接收到http数据包后的解析流程，css的可视化格式模型，js引擎解析过程等；其他呈现页面效果。

：这里就需要你对浏览器内核的理解：其中主要的渲染引擎和JS引擎，这里了解一下你对浏览器内核的理解。

1. 渲染引擎，是负责取得网页的内容，整理信息，以及计算网页的显示方式，然后输出到显示器上。
2. JS引擎是用于解析和执行javascript来实现网页的动态效果。

> 浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。其实最开始渲染引擎和JS引擎是没有区分明确的，不过后来JS引擎越来越独立，so，内核就倾向于渲染引擎。

> 对于资源请求/获取,资源响应/页面渲染，会给网络带宽和设备资源带来压力，这个时候就会考虑到web的性能优化。

# 5.web的性能优化

其中里面的**性能关键：**

> 什么是数据包 数据包（IP数据包），指封装在固定结构的一系列字节，它定义了数据包的长度，传输的细节，以及其他与TCP相关的信息。

延迟：指IP数据包从一个网络端点到另一个网络端点所花费的时间。（所花费时间在于往返时延，是延迟的时间的两倍）

带宽：只要带宽没有饱和，两个网络端点的连接会一次处理尽可能多的数据量（所以带宽可能会成为性能的瓶颈）

建立连接时间：在客户端和服务器之间建立连接往返数据（三次握手）

TCP三次握手过程：客户端向服务器发起一个SYN包，服务器端返回对应的SYN的ACK响应以及新的SYN包，然后客户端返回对应的ACK。（在客户端和服务器之间建立正常的TCP网络连接时，客户端首先发出一个SYN消息，服务器使用SYN+ACK应答表示接收了这个消息，最后客户端再以ACK消息响应。）

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06f27a3da7364b33be86b52155dc285d~tplv-k3u1fbpfcp-zoom-1.image)

> SYN是同步序列编号，是TCP/IP建立连接时使用的握手信息。ACK是确认字符，在数据通信中，接收站发给发送站的一种传输类控制字符。表示发来的数据已确认接收无误。在TCP/IP协议中，如果接收方成功的接收到数据，那么会回复一个ACK数据。通过ACK信号有自己固定的格式，长度大小，由接收方回复给发送方。

**详解三次握手**：

第一次握手，建立连接时，客户端发送SYN包到服务器，并进入SYN_SENT状态，等待服务器确认，其中SYN就是同步序列编号。

第二次握手，服务器收到SYN包，必须确认客户的SYN，同时自己也发送一个SYN包，即是SYN+ACK包，此时服务器进入SYN_RECV状态。

第三次握手，客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK，此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。

> 完成三次握手，客户端与服务器开始传送数据。

TLS协商时间（TLS会造成额外的往返传输）

1. 客户端发起https连接，需要进行传输层安全协议协商
2. TLS用来取代安全套接层SSL

除了网络，还有**页面内容本身或服务器性能**，如首字节时间TTFB，内容下载时间，开始渲染时间，文档加载完成的时间等。

> 那么什么是TTFB，它是指客户端从开始定位到web页面，至接收到主体页面响应的第一字节所耗费的时间。它是测量：从浏览器发起请求至收到其第一字节之间的耗时。

> 内容下载时间是等同于被请求资源的最后字节到达时间。

> 开始渲染时间，从客户看到空白页面的时长。

# 5.1web性能优化技术（减少客户端网络延迟和优化页面渲染性能来提升web性能）

优化技术：

- DNS查询优化
- 客户端缓存
- 优化TCP连接
- 避免重定向
- 网络边缘的缓存
- 条件缓存
- 压缩和代码极简化
- 图片优化

# 6. http1.1

- 改进持久连接和CDN域名的分片机制
- 不成熟的http管道化
- 提供虚拟主机支持
- 对动态生成的内容完美支持
- 引入cookie以及安全机制

对于http1的问题，迎来了http2。其中http1的问题：

队头阻塞，大多数情况下，浏览器会希望同时获取许多资源，但http1未提供机制来同时请求这些资源，如果仅是使用一个连接，需要发起请求，等待响应，然后才能发起下一个请求。

在http1中要给特性为管道化，可以允许一次发送一组请求，但是需要按照发送顺序依次接收响应。所以在请求应答过程中，如发生什么情况，剩下的工作都会被阻塞，这就是“队头阻塞”（阻塞在那次请求应答发生错误），阻碍网络传输和web页面的渲染，指导失去响应。

低效的TCP利用，TCP协议作为最可靠的协议之一，其核心是拥塞窗口。

> 拥塞窗口，是卫星通信在因特网中防止通信拥塞的一种措施，它是在发端采用了一种“拥塞避免”算法和“慢速启动”算法相结合的机制。“拥塞窗口”就是“拥塞避免”的窗口，它是一个装在发送端的可滑动窗口，窗口的大小是不超过接收端确认通知的窗口。

拥塞窗口指在接收方确认数据包之前，发送方可以发送的TCP包的数据。（如拥塞窗口指定为1的情况，那么发送方就发出1哥数据包之后，只有接收方确认了那个发出的数据包，才能发送下一个）

拥塞控制能防止过多的数据注入到网络中，用于避免网络过载，TCP中可以通过**慢启动**探索当前连接对应拥塞窗口的合适大小。即发送者发送数据的时候并非一开始注入大量数据到网络中，而是发送一个数据包进行测试，当得到确认回复后，额外发送一个未确认包。

这意味着得到一个确认回复，可以发送两个数据包，得到两个确认回复，可以发送四个数据包，以几何形式增长很快到达协议规定的拥塞窗口大小（发包数上限），这时候连接进入**拥塞避免阶段**，这种机制需要往返几次才能得知最佳拥塞窗口大小，但往返几次所需的时间成本不可忽略。

- 拥塞窗口的大小取决于网络的拥塞程度，并且动态地在变化。发送方让自己的发送窗口等于拥塞窗口。如果再考虑到接收方的接收能力，那么发送窗口还可能小于拥塞窗口。
- 发送方控制拥塞窗口的原则是：只要网络没有出现拥塞，拥塞窗口就再增大一些，以便把更多的分组发送出去。但只要网络出现拥塞，拥塞窗口就减少一些，以减少注入到网络中的分组数。

> tcp中的慢启动概念，是用来探索当前连接对应拥塞窗口的合适大小。用来弄清楚新连接当前的网络情况。“慢速启动”是在连接建立后，每收到一个来自收端的确认，就控制窗口增加一个段值大小，当窗口值达到“慢速启动”的限值后，慢速启动便停止工作，避免了网络发生拥塞。

> TCP传输控制协议的设计思路是，对假设情况很保守情况下，能够公平对待同一网络的不同流量的应用，它的避免拥塞机制被设计城即使在最差的网络情况下也可以起作用。

臃肿的消息首部，HTTP/1.1能压缩请求内容，但是消息首部却不能压缩。它可能占据请求的绝大部分（也可能是全部）也是比较常见了。（在这里如果能压缩请求首部，把请求变得更小，就能够缓解带宽压力了，降低系统的总负载）

受限的优先级设置，即如果浏览器针对指定域名开启多个socket请求，若web页面某些资源会比另外一些资源重要，会加重资源的排队效应，会延迟请求其他的资源，优先级高的资源先获取，优先级低的资源会在资源高的资源处理完成，（在处理过程中，浏览器不会发起新的资源请求）等待高的完成后再发起请求，(这就会让总的页面下载时间延长)。

> 在请求优先级高的资源的时间区间内浏览器并不会发起优先级较低的新请求

小结：HTTP1.1慢启动影响资源首次加载速度，TCP建立连接后，会开始请求传输，开始比较慢，然后不断加快，为了防止出现网络拥堵，会让页面的首次渲染时间变长。开始多个tcp，如出现网络下降，无法识别资源的优先级，会出现竞态问题。

# 7.如何进行网站性能优化

1. 内容方面，减少Http请求（合并文件，css精灵，inline Image)，减少DNS查询（DNS缓存，将资源分布到合适的数量的主机名），减少DOM元素的数量。
2. Cookie方面，可以减少Cookie的大小。
3. css方面，将样式表放到页面顶部；不使用css表达式；使用不使用@import；可将css从外部引入；压缩css。
4. JavaScript方面，将脚本放到页面底部；将JavaScript从外部引入；压缩JavaScript，删除不需要的脚本，减少DOM的访问。
5. 图片方面，可优化css精灵，不要再HTML中拉伸图片，优化图片（压缩）。

# 8.http状态码以及含义

1. 对于1xx的状态码，为信息状态码，100 为继续，表示确认，成功返回具体参数信息。
2. 对于2xx的状态码，200 表示正常返回信息，201表示请求成功并且服务器创建了新的资源，202表示服务器已接受请求，但尚未处理。
3. 对于3xx，重定向，301表示，请求的网页已永久移动到新位置，302表示，临时性重定向，303表示临时性重定向，且总是使用 GET 请求新的 URI。304表示，自从上次请求后，请求的网页未修改过。
4. 对于4xx，客户端错误，404，服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求，401，请求未授权，403，禁止访问，404，找不到如何与 URI 相匹配的资源。
5. 对于5xx，服务器错误，500，最常见的服务器端错误，503，服务器端暂时无法处理请求，可能是过载或维护。

# 9.http-数据压缩

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8acb1a74d00842748fbb4f74a8c11b85~tplv-k3u1fbpfcp-zoom-1.image)

数据压缩，在浏览器中发送请求时会带着Content-Encoding: gzip，里面时浏览器支持的压缩格式列表，有多种如，gzip，deflate，br等。这样服务器就可以从中选择一个压缩算法，放进Content-Encoding响应头里，再把原数据压缩后发给浏览器。

# 10.http-分块传输

分块传输，就是将传输的文件分解成多个小块，然后分发给浏览器，浏览器收到后再重新组装复原。

每个分开包含两个部分，分块长度和分块数据（长度头和数据块），长度头以CRLF结尾的一行明文，数据块紧跟在长度头后面，也是用CRLF结尾，最后用一个长度为0的块表示结束。

在响应报文里用头字段Transfer-Encoding:chunked表示报文里的body部分不是一次性发送过来的，而是分成了许多块逐个发送的。

在Transfer-Encoding：chunked和Content-Length中，这两个字段是互斥的。

> 一个响应报文的传输长度要么已知，要么长度未知（chunked）。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d2bae5df40f47f49102cb6de5585f2c~tplv-k3u1fbpfcp-zoom-1.image)

Content-Length: 299

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f03ab3f44c394bb1959ecacf1d521f86~tplv-k3u1fbpfcp-zoom-1.image)

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cb3210fc28d449e9992698953f484fc~tplv-k3u1fbpfcp-zoom-1.image)

# 11.http-范围请求

断点续传

> 要实现该功能需要制定下载的实体范围，这种制定范围发送请求叫做范围请求。

Accept-Ranges：服务器使用http响应头Accept-Ranges标识自身支持范围请求，字段的具体值用于定义范围请求的单位。

语法

```
Accept-Ranges: bytes,范围请求的单位是 bytes （字节）Accept-Ranges: none,不支持任何范围请求单位
复制代码
```

范围请求时用于不需要全部数据，只需要其中的部分请求时，可以使用范围请求，允许客户端在请求头里使用专用字段来表示只获取文件的一部分。

Range的格式，请求头Range是HTTP范围请求的专用字段，格式是“bytes=x-y”,以字节为单位的数据范围。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33db4aa631894c1d9ff9e48f09f97562~tplv-k3u1fbpfcp-zoom-1.image)

1. “0-”表示从文档起点开始到文档结束的整个文件。
2. “100-”表示从第100哥字节开始到文档末尾。
3. “-10”表示从文档末尾倒数的第10个字节开始。

示例：

```
执行范围时会使用头部字段 Range 来指定资源 byte 的范围。Range格式：5001-10000字节Range : byte = 5001-100005000之后的Range : byte = 5001-0-3000字节，5001-10000字节Range : byte=-3000,5001-10000
复制代码
```

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f21c51b630a746358599808065a0f315~tplv-k3u1fbpfcp-zoom-1.image)

上图表示服务器收到Range字段后，检测范围合法性，范围越界，就会返回状态码416，如你的文件只有1000个字节，但请求范围在20000-3000，就会导致这个状态码的出现。

如果成功读取文件，范围正确，返回状态码“206”。服务器要添加一个响应头字段Content-Range,告诉片段的实际偏移量和资源的总大小。

最后是发送数据，直接把片段用TCP发给客户端，一个范围请求就算是处理完了。

> 格式是“bytes x-y/length”,与Range头区别在没有“=”

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fde2c725d7b445e9a76fa7aeae289a1d~tplv-k3u1fbpfcp-zoom-1.image)

Content-Range: bytes 0-4395719/4395720

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8634f3ef853d446b82a49a75aa1cc3d4~tplv-k3u1fbpfcp-zoom-1.image)

# 12.http-多段数据

多端数据，就是在Range头里使用多个“x-y"，一次性获取多个片段数据。使用一种特殊的MIME类型：“multipart/byteranges”，用来表示响应报文包含了多个范围时使用。多种范围请求 响应会在头部 Content-Type 表明 multipart-byteranges。

多段数据图：分隔标记boundary来区分不同的分段

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6bb93bd5ad974e53bacb5b44d3923e0b~tplv-k3u1fbpfcp-zoom-1.image)

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af65346e303441cb834701f4b1fc4228~tplv-k3u1fbpfcp-zoom-1.image)

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d9edbff7bc24534833d846ba7a68e96~tplv-k3u1fbpfcp-zoom-1.image)

# 13.说一说cookies，sessionStorage 和 localStorage 的区别？

- cookie是网站用来标识用户身份而存储在用户本地终端上的数据
- cookie数据始终在同源的http请求中携带，即使是不需要的情况，so，会在浏览器和服务器间来回传递
- sessionStorage和localStorage不会自动把数据发送给服务器，仅仅在本地保存

> 存储的大小

cookie的数据大小不能超过4k；sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或者更大。

> 有限期时间

1. localStorage存储持久数据，浏览器关闭后数据不会丢失，除了主动删除数据
2. sessionStorage数据在当前浏览器窗口关闭后自动删除
3. 设置得cookie过期时间之前都有效，就算窗口或者是浏览器关闭

# 14.为什么说利用多个域名来存储网站资源会更有效？

因为CDN缓存更方便；突破浏览器并发限制；节约cookie带宽；节约主域名得连接数，优化页面响应速度；防止不必要的安全性问题。

# 15.http2.0的内容

http2是超文本传输协议的第二版，相比http1协议的文本传输格式，http2是以二进制的格式进行数据传输的，具有更小的传输体积以及负载。

http2.0分层，分帧层（http2多路复用能力的核心部分),数据或http层（包含传统上被认为是 HTTP 及其关联数据的部分）。

HTTP2.0：

- 多路复用机制，引入了二进制的分帧层机制来实现多路复用。（分帧层是基于帧的二进制协议。这方便了机器解析。请求和响应交织在一起。）
- 可以设置请求的优先级（客户端的分帧层对分割块标上请求的优先级）。
- 头部压缩 请求头压缩，增加传输效率。

> HTTP/2较HTTP/1.1优化亮点

- 多路复用的流
- 头部压缩
- 资源优先级和依赖设置
- 服务器推送
- 流量控制
- 重置消息

多路复用的实现：

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac62df98b13241e7acd28731e16cd3bf~tplv-k3u1fbpfcp-zoom-1.image)

在单个域名下仍可以建立一个TCP管道，使用一个TCP长连接，下载整个资源页面，只需要一次慢启动，并且避免了竞态，浏览器发起请求，分帧层会对每个请求进行分割，将同一个请求的分割块打上相同的id编号，然后通过协议栈将所有的分割体发送给服务器，然后通过服务器的分帧层根据id编号进行请求组装，服务器的分帧层将回应数据分割按同一个回应体进行ID分割回应给客户端，客户端拼装回应。

对于http2中的帧（frame），http1不是基于帧（frame）的，是文本分隔的。

GET/HTTP/1.1 

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a686dced98b0495bb1c1f8a783a87e4b~tplv-k3u1fbpfcp-zoom-1.image)

这样，对于http1的请求或者是响应可能有的问题：

1. 一次只能处理一个请求或者是响应，完成之前是不能停止解析的。
2. 无法预判解析需要多少内层。

HTTP/1 的请求和响应报文，是由起始行、首部和正文组成，换行符分隔；HTTP/2是将请求和响应数据分割成更小的帧，采用二进制编码，易于解析的。

参考图片：

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ab5301e11a49eeb84b7b99f139729d~tplv-k3u1fbpfcp-zoom-1.image)

> 帧结构总结 所有的帧都包含一个9 byte的帧头 + 可边长的正文不同。根据帧的类型不同，正文部分的结构也不一样。

帧头：

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb9ca267b8254bcd9cb0e1a5e21a50f1~tplv-k3u1fbpfcp-zoom-1.image)

# 16.http2-幕后

http2作为一个二进制协议，拥有包含轻量型，安全和快速在内的所有优势，保留了原始的http协议语义，对于http2更改了在系统之间传输数据的方式。

> 二进制分帧层（binary framing layer），所有通信都在单个TCP连接上执行，该连接在整个对话期间一直处于打开状态，主要是二进制协议将通信分解为帧的方式，这些帧交织在客户端与服务器之间的双向逻辑流中。

HTTP/2 连接的拓扑结构(展示了一个用于建立多个流的连接)

在流 1 中，发送了一条请求消息，并返回了相应的响应消息。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23a8e36e53804933a6c91b304c1cb86e~tplv-k3u1fbpfcp-zoom-1.image)

HTTP/2 帧结构

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53f11455742844bbbe9b8443cd79a75e~tplv-k3u1fbpfcp-zoom-1.image)

前9个字节对于每个帧是一致的。解析时只需要读取这些字节，就可以准确地知道在整个帧中期望的字节数。

帧首部字段表格：

名称长度描述length3字节表示帧负载的长度type1字节当前帧类型Flags1字节具体帧类型的标识R1位保留位，不要设置，否则会带来严重后果Stream Identifier31位每个流的唯一IDFrame Payload长度可变真实的帧内容,长度是在length字段中设置的

备注：流Id是用来标识帧所属的流。流看作在连接上的一系列帧，它们构成了单独的 HTTP 请求和响应。

对于http1 的请求和响应都分成消息首部和消息体两部分；http2 从上面一张图可以知道，http2的请求和响应分成HEADERS 帧和 DATA 帧。

比较一下：

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f162217ef87040658580e66e7ad7e877~tplv-k3u1fbpfcp-zoom-1.image)

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b898ca6deee24ad38602bef167556968~tplv-k3u1fbpfcp-zoom-1.image)

http2的一个重要特性是基于流的流量控制。提供了客户端调整传输速度的能力。其中WINDOW_UPDATE 帧用来指示流量控制信息。

有了多路复用，客户端可以一次发出多有资源的请求，不用像http1那样，发出对新对象请求之前，需要等待前一个响应完成。所以浏览器失去了在Http1中的默认资源请求优先级策略。

# 17.浏览器生成http请求消息

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/405edd6712bc4350b98cf737b047d47b~tplv-k3u1fbpfcp-zoom-1.image)

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13077652fdcf4cd68474be652ab1180b~tplv-k3u1fbpfcp-zoom-1.image)

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbc2e31c7b62498189a150c56388cdec~tplv-k3u1fbpfcp-zoom-1.image)

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e1a19c33c8040ad9d013cfec3fcd398~tplv-k3u1fbpfcp-zoom-1.image)

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a296db3b7be5483594e94ae81d524dad~tplv-k3u1fbpfcp-zoom-1.image)

http的头字段

头字段类型含义Date表示请求和响应生成的日期Pragma表示数据是否允许缓存的通信选项Cache-Control控制缓存的相关信息Connection设置发送响应之后TCP连接是否继续保持的通信选项Transfer-Encoding表示消息主体的编码格式Via记录途中经过的代理和网关Authorization身份认证数据From请求发送者的邮件地址Referer当通过点击超级链接进入下一个页面时，在这里会记录下上一个页面的URIUser-Agent客户端软件的名称和版本号等相关信息Accept客户端可支持的数据类型，以MIME类型来表示Accept-Charset客户端可支持的字符集Accept-Language客户端可支持的语言Host接收请求的服务器ip地址和端口号Range当需要只获取部分数据而不是全部数据时，可通过这个字段指定要获取的数据范围Location表示信息的准确位置Server服务器程序的名称和版本号等相关信息Allow表示指定的URI支持Content-Encoding当消息体经过压缩等编码处理时，表示其编码格式Content-Length表示消息体的长度Content-Type表示消息体的数据类型，以MIME规格定义的数据类型来表示Expires表示消息体的有效期Last-Modified数据的最后更新日期Content-Language表示消息体的语言Content-Location表示消息体在服务器上的位置Content-Range当仅请求部分数据时，表示消息体包含的数据范围

HTTP消息示例：

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f30ded525e84e7392b4071209e1aaa5~tplv-k3u1fbpfcp-zoom-1.image)

1. HTTP,超文本传送协议。
2. 协议，通信操作的规则定义称为协议。
3. URI，统一资源标识符。
4. 1 条请求消息中只能写 1 个 URI。如果需要获取多个文件，必须 对每个文件单独发送 1 条请求。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1acce8abfaa04ef1a2f6e8ba03e5f2e4~tplv-k3u1fbpfcp-zoom-1.image)

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53a75664359a4598b6dbbccab6322dc3~tplv-k3u1fbpfcp-zoom-1.image)

IP 的基本思路

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0fd073e812dc4717bcc0d2e5eacd2993~tplv-k3u1fbpfcp-zoom-1.image)

Ip地址的表示方法

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4866581c4a449909dd76faa8ff2813a~tplv-k3u1fbpfcp-zoom-1.image)

IP地址的结构-子网掩码表示网络号与主机号之间的边界。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23c89eafcb034ab5832e5f430cf972bc~tplv-k3u1fbpfcp-zoom-1.image)

解析器的调用方法

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0eb25b3a8fb142bf9642200b03d22fb8~tplv-k3u1fbpfcp-zoom-1.image)

DNS服务器的基本工作

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e3e287489d6444cab2493b0c829c1b4~tplv-k3u1fbpfcp-zoom-1.image)

DNS 服务器之间的查询操作

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa55de4ec66c4ceba5828c6df5f8d43f~tplv-k3u1fbpfcp-zoom-1.image)

数据通过类似管道的结构来流动

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fa45cae9910e4844b7615f0ca28f4b85~tplv-k3u1fbpfcp-zoom-1.image)

# 18.了解网络基础知识

- 物理层
- 数据链路层
- 网络层
- 传输层
- 会话层
- 表示层
- 应用层

计算机网络，可以将规模分WAN,Wide Area Network广域网，和LAN局域网。通过电脑连接交换机再到路由器的连接。

> 你知道计算机与网络都经历了怎么样的一个发展过程吗？

1. 批处理就是指事先将用户程序和数据装入卡带或磁带，由计算机按照一定的顺序读取，使用户所要执行的这些程序和数据能够一并批量得到处理的方式。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9075cad7794e4d5aa23b8d7cb9ee861e~tplv-k3u1fbpfcp-zoom-1.image)

1. 分时系统，是指多个终端与同一个计算机连接，允许多个用户同时使用一台计算机的系统。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/846cb8bc149c4134a3c67ef2b24b217d~tplv-k3u1fbpfcp-zoom-1.image)

1. 计算机网络

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cdc01cbd0154c788d9137e9ce17badf~tplv-k3u1fbpfcp-zoom-1.image)

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42a3afa4665b4bca8065bdb22aabf08c~tplv-k3u1fbpfcp-zoom-1.image)

> TCP/IP的机制是什么，TCP/IP通信协议的统称，学习这个有人一定不了解什么是协议。

但我们在接触到程序时，常常听到协议如IP，TCP，HTTP等协议。记住TCP/IP就是IP,TCP,HTTP等协议的集合。协议就是计算机与计算机之间通过网络实现通信时需要达成的一种的“约定”。这些协议就是让不同厂商的设备，不同的CPU和不同的操作系统组成的计算机之间进行通信。

就是两台计算机之间都能支持相同的协议，并遵循才能实现相互通信。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/77bdcb5a0cfd4738a25f898b14938f3c~tplv-k3u1fbpfcp-zoom-1.image)

> 分组交换协议

分组交换就是将大数据分割成一个一个叫做包的较小单位进行传输的方法。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800" height="600"></svg>)

分层模块

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0883a017f7d4c04b732a3dde23ab203~tplv-k3u1fbpfcp-zoom-1.image)

> 了解OSI参考模型

OSI将分为易于理解的7层：

1.物理层，2.数据链路层，3.网络层，4.传输层，5.会话层，6.表示层，7.应用层。

应用层：是对特定应用的协议。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/42d1790ae56c41159707800576bae539~tplv-k3u1fbpfcp-zoom-1.image)

表示层：设备固有数据格式和网络标准数据格式的转换。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6e90f3db3014bb9b97d43d644e87736~tplv-k3u1fbpfcp-zoom-1.image)

会话层：通信管理。负责建立和断开通信连接。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/934faf4d674e4783a511084b8771f73d~tplv-k3u1fbpfcp-zoom-1.image)

传输层：管理两个节点之间的数据传输。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b47f8e64a9c7421baf8ecace330732e8~tplv-k3u1fbpfcp-zoom-1.image)

网络层：地址管理与路由选择。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14358ac25bc543abb52851578dbfb46c~tplv-k3u1fbpfcp-zoom-1.image)

数据链路层：互连设备之间传送和识别数据帧。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/81d9c7080ca0417dbff6757c709321fb~tplv-k3u1fbpfcp-zoom-1.image)

物理层：以“0”，“1”代表电压的高低，灯光的闪灭。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0810f4976a8e4876b6f01fbff7d7e45d~tplv-k3u1fbpfcp-zoom-1.image)

> 如何模块化通信传输

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed4702cb3bbe44a5bdb849f115790ff1~tplv-k3u1fbpfcp-zoom-1.image)

> 网络构成要素

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0ce0f1455034c8487b104cb8de4dad5~tplv-k3u1fbpfcp-zoom-1.image)

网卡：

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e47fe52574e4508ac7d07faa0cea20b~tplv-k3u1fbpfcp-zoom-1.image)

什么是网关，它是OSI参考模型中负责将从传输层到应用层的数据进行转换和转发的设备。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/13c5de7b9ba14c7ea7e391cf02fd3ff0~tplv-k3u1fbpfcp-zoom-1.image)

代理服务：

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7ee35f4417a4a9ab210451e948ea53e~tplv-k3u1fbpfcp-zoom-1.image)

# 19.有哪些渲染优化呢？

第一，我们可以禁止使用iframe，第二，可以禁止使用gif图片来实现loading效果，降低CPU的消耗，来提升渲染性能，第三，使用CSS3代码来代替JS动画。

对于一些小图标，可以使用base64位编码，以减少网络请求，但不建议大图使用，因为比较耗费CPU，小图标优势在于，可以减少HTTP请求，避免文件跨域，修改及时生效。

页面头部的style和script会阻塞页面，在Renderer进程中的JS线程和渲染线程是互斥的。

# 20.学习TCP和IP的基础知识

TCP/IP协议族市一组协议的集合，也称为互联网协议族。

20世纪60年代后半叶，应DoD要求，美国开始进行通信技术相关的演技，ARPANET的诞生，开发分组交互技术，在1975年，TCP/IP的诞生。1983年，ARPANET决定正式启用TCP/IP为通信协议。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/172c8a2de6954e799670a36268821fe9~tplv-k3u1fbpfcp-zoom-1.image)

> TCP/IP与OSI参考模型

对于OSI七层模型太细了，而互联网协议族TCP/IP模型划分为四层。

TCP/IP模型（应用层，传输层，互联网层，网络接口层）-应用层，传输层，网络层，链路层。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/893f6d517c0149f88d67348e03b94868~tplv-k3u1fbpfcp-zoom-1.image)

传输层就是可以让应用程序之间实现通信。

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45877d9b68b744829de1e27926368875~tplv-k3u1fbpfcp-zoom-1.image)

在其中TCP是一种面向有连接的传输层协议，保证两端通信主机之间的通信可达。UDP是一种面向无连接的传输层协议，so，UDP用于分组数据较少或者多播，广播通信以及视频通信等领域。

应用层

![连肝7个晚上，总结了计算机HTTP网络协议的知识点](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e5611429e934f9ab7bb26bbd047ede1~tplv-k3u1fbpfcp-zoom-1.image)




#### 来自

https://juejin.cn/post/6899005188955176974?utm_source=gold_browser_extension

