const fs = require('fs')
const path = './msg.txt'
// fs.truncate(path[, len], callback)
// fs.truncateSync(path[, len])
// fs.ftruncate(fd[, len], callback)
// fs.ftruncateSync(fd[, len])
fs.truncate(path, 10 , err => {
  if (!err) {
    console.log('success')
    fs.stat(path, (err, stat) => {
      console.log(stat.size)
    })
  }
})
