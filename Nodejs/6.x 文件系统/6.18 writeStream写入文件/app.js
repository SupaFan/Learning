const fs = require('fs')
const path = './msg.txt'
const readStream = fs.createReadStream(path)
const writeStream = fs.createWriteStream('./anotherMsg.txt')
let writeReturn;
readStream.on('data', data => {
  writeReturn = writeStream.write(data)
  console.log(writeReturn)
})

writeStream.on('open', fd => {
  console.log(`文件写入完毕`)
})

readStream.on('end', () => {
  writeStream.end('追加文字', () => {
    console.log('全部写入完毕')
    console.log('共写入%d字节数据', writeStream.bytesWritten)
  })
})
