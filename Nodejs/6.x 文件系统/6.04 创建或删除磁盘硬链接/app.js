const fs = require('fs')
const path = './msg.txt'
const repath = './test/rmsg.txt'
fs.link(path, repath, res => { console.log(res)})

setTimeout(() => {
  fs.unlink(repath, res => { console.log(res)})
}, 3000)