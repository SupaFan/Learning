const fs = require('fs')
const path = './test'
const path2 = './test2'

fs.exists(path, (exists) => {
  console.log(exists)  // true
})
fs.exists(path2, (exists) => {
  console.log(exists) // false
})


const exists = fs.existsSync(path)
console.log(exists) // true