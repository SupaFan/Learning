const fs = require('fs')
const buf = new Buffer('打开文件然后文件')
// fs.open(path, flags[, mode], callback)
fs.open('./msg.txt', 'w', (err, fd) => {
  fs.write(fd, buf, 0, 18, 3, (err, written, buffer) => {
    console.log(err, written, buffer.slice(0, written).toString())
  })
})



