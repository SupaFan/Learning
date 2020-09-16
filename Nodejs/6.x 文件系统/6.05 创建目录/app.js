const fs = require('fs')
// fs.mkdir(path, [mode], callback(err))
fs.mkdir('./test', err => {
  if(err) console.log(err)
})