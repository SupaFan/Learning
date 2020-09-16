const fs = require('fs')
const filename = './msg.txt'
// fs.watchFile(filename[, options], listener)
/**
  * filename <string> | <Buffer> | <URL>
  * options <Object>
    * persistent <boolean> Default: true
    * interval <integer> Default: 5007
  * listener <Function>
    * current <fs.Stats>
    * previous <fs.Stats>
 */
// fs.watchFile(filename, {persistent: true} , (current, previous) => {
//   console.log(`文件被修改: 尺寸为${current.size}`)
//   console.log(Date.parse(current.ctime))
// })
fs.watch(filename, (event, filename) => {
  console.log(event, filename)
})
