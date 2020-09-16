const fs = require('fs')
const path = './copy.png'
const repath = './test/rename.png'
fs.rename(path, repath, res=> {
  if (res) {
    console.log(res)
  } else {
    console.log('移动成功')
  }
})