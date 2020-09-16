const fs = require('fs')
// 可选的 options 参数用于传入回调的路径，它可以是一个字符串并指定一个字符编码，或是一个对象且由一个 encoding 属性指定使用的字符编码。 如果 encoding 设为 'buffer'，则返回的路径会被作为 Buffer 对象传入。
// 注意: 如果路径解析到套接字或 pipe ，函数将返回与该对象相关的系统名称。
// fs.realpath(path[, options], callback)  options: {option: 'utf8'} {option: 'buffer'} 'buffer'
fs.realpath('./test/msg.txt', 'utf8', (err, resolvePath) => {
  console.log(err, resolvePath)
})

console.log(fs.realpathSync('./test/msg.txt'))