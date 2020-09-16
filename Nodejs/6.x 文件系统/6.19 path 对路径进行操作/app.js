const fs = require('fs')
const path = require('path')
// fs.realpath('./msg.txt', 'utf8', (err, resolvePath) => {
//   console.log(resolvePath)
// })
console.log(path.normalize("d:\\jfanSpace\\nodejs\\6.x 文件系统\\6.19 path 对路径进行操作\\msg.txt"))

// path.join([...paths]) 方法使用平台特定的分隔符把全部给定的 path 片段连接到一起，并规范化生成的路径。
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');

// path.parse(path)
console.log(path.parse('d:\\jfanSpace\\nodejs\\6.x 文件系统\\6.19 path 对路径进行操作\\msg.txt'))
