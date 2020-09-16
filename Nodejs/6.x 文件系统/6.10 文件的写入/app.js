const fs = require('fs')
// fs.writeFile(filename,data,[option],callback)
fs.writeFile('msg.txt','line1 \r\nline2', function (err) {
  console.log('文件写入完毕')
  console.log('------开始读取文件------')
  const data = fs.readFileSync('./msg.txt','utf8')
  console.log('------读取文件完毕------')
})
// 追加写入
fs.writeFile('./msg.txt','\rthis is a add text',{
  flag: 'a+'
}, err => {
  console.log('追加写入 ok')
})