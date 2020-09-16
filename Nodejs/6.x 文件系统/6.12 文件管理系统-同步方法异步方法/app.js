const fs = require('fs')
const data = fs.readFileSync('./index.html', 'utf8')
console.log(`同步读取文件成功: ${data}`)


fs.readFile('./index.html', 'utf8' , (err, data) => {
  console.log('异步读取文件完毕: ' + data)
})

