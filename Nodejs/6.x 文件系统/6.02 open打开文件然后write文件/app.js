const fs = require('fs')
const buf = new Buffer('打开文件然后文件')
// fs.open(path, flags[, mode], callback)
fs.open('./msg.txt', 'w', (err, fd) => {
  fs.write(fd, buf, 0, 9, 0, (err, written, buffer) => {
    console.log(err, written, buffer.toString())
    fs.write(fd, buf, 9, 15, null, (err, written, buffer) => {
      console.log('追加写入成功')
    })
    fs.close(fd, () => {
      console.log('关闭')
    })
    //fs.closeSync(fd)
  })
})
