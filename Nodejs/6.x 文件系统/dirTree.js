const fs = require('fs')
const Path = require('path')
const dirTree = {}
const basePath = Path.join(__dirname, '/')

const readDir = function (dirPath, list) {

  list.children = []
  list.files = []
  const _dirTree = fs.readdirSync(dirPath, {encoding: 'utf8'})

  _dirTree.forEach(walk)
  function walk (filename, index) {
    const _thisDirName = Path.join(dirPath, filename)
    const stats = fs.statSync(_thisDirName)

    if (stats.isDirectory()) {
      const obj = {
        fileName: filename,
        path: Path.normalize(_thisDirName)
      }
      list.children.push(obj)
      // 递归遍历下级目录以及文件
      readDir(_thisDirName, obj)
    } else {
      list.files.push({
        fileName: filename,
        path: Path.normalize(_thisDirName)
      })
    }
  }

  const str = JSON.stringify(dirTree, null, 2)
  fs.writeFile('./dirTree.json', str, {encoding: 'utf8'}, err => {
    console.log('写入成功')
  })
}
readDir(basePath, dirTree)

