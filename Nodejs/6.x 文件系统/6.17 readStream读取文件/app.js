const fs = require('fs')
const path = './msg.txt'
const readStream = fs.createReadStream(path, {start:3,autoClose: false, encoding: 'utf8'})
readStream.on('open', fd => {
  console.log('---------------开始读取文件---------------')
  console.log(fd) // 3
})

// 暂停
// readStream.pause()
// readStream.resume()

readStream.on('data', data => {
  console.log('---------------读取文件成功---------------')
  console.log(data)
})

readStream.on('end', () => {
  console.log('---------------读取文件完毕---------------')
})

readStream.on('close', () => {
  console.log('-----------------文件关闭-----------------')
})

readStream.on('error', () => {
  console.log('---------------文件读取失败---------------')
})