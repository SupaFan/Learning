const fs = require('fs')
// fs.readdir(path, callback(err, file))
// fs.readDirSync(path) // 返回目录数组
fs.readdir('./test', (err, file) => {
  if(err) console.log(err)
  console.log(file)
})