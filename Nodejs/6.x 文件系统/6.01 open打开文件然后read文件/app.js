const fs = require('fs')

// fs.open(path, flags[, mode], callback)
fs.open('./msg.txt', 'r', (err, fd) => {
  const buf = new Buffer(255)
  // fs.read(fd, buffer, offset, length, position, callback(err, bytesRead, buffer))
  // fd - 通过 fs.open() 方法返回的文件描述符。
  // buffer - 数据写入的缓冲区。
  // offset - 缓冲区写入的写入偏移量。
  // length - 要从文件中读取的字节数。
  // position - 文件读取的起始位置，如果 position 的值为 null，则会从当前文件指针的位置读取。
  // callback - 回调函数，有三个参数err, bytesRead, buffer，err 为错误信息， bytesRead 表示读取的字节数，buffer 为缓冲区对象。
  fs.read(fd, buf, 0, 9, 3, (err, bytesRead, buffer) => {
    console.log('异步读取文件:'+ err, bytesRead, buffer.slice(0, bytesRead).toString())
    fs.read(fd, buf, 0, 6, null, (err, bytesRead, buffer) => {
      console.log('从当前文件指针的位置读取:' + err, bytesRead, buffer.slice(0, bytesRead).toString())
    })
  })

  const bufSync = new Buffer(255)
  const lth = fs.readSync(fd,bufSync,0,12,3)
  console.log('同步读取文件:'+ bufSync.slice(0,lth).toString())

})



