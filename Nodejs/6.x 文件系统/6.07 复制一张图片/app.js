const fs = require('fs')
// fs.writeFile(filename,data,[option],callback)
fs.readFile('./test.png',(err, data) => {
  fs.writeFile('./copy.png', data,  res => {
    console.log('复制完毕')
  })
})

const file  = fs.createReadStream('./test.png')
const out  = fs.createWriteStream('./anotherImg.png')

file.pipe(out)