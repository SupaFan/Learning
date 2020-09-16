const fs = require('fs')
// 追加写入
fs.appendFile('./msg.txt','\rthis is a append text2', err => {
  console.log('追加写入 ok')
})