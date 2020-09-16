const fs = require('fs')
const path = './test'
// fs.rmdir(path, callback)
// fs.rmdirSync(path)
// 只能删除空目录
fs.rmdir(path, err => {
  if(err) {console.log(err)}
  else {
    console.log('success')
  }
})