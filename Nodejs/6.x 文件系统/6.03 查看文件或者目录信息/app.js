const fs = require('fs')
fs.stat('./test', (err, stats) => {
  // fs.stat(path, callback(err, stats))
  console.log(err, stats)
  // stats.isFile()	如果是文件返回 true，否则返回 false。
  console.log(stats.isFile())
  // stats.isDirectory()	如果是目录返回 true，否则返回 false。
  console.log(stats.isDirectory())
  // stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
  console.log(stats.isBlockDevice())
  // stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
  console.log(stats.isCharacterDevice())
  // stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
  console.log(stats.isSymbolicLink())
  // stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
  console.log(stats.isFIFO())
  // stats.isSocket()	如果是 Socket 返回 true，否则返回 false。
  console.log(stats.isSocket())
  // 属性值 设备ID
  console.log(stats.dev)
  // 属性值 索引编号
  console.log(stats.ino)
  // 属性值 权限标志
  console.log(stats.mode)
  // 属性值 硬链接数量
  console.log(stats.nlink)
  // 属性值 所有者的用户ID unix下有效
  console.log(stats.uid)
  // 属性值 组ID unix下有效
  console.log(stats.gid)
  // 属性值 所在设备ID unix下有效
  console.log(stats.rdev)
  // 属性值 文件尺寸
  console.log(stats.size)
  // 属性值 访问时间
  console.log(stats.atime)
  // 属性值 修改时间
  console.log(stats.mtime)
  // 属性值 创建时间
  console.log(stats.ctime)
})

fs.stat('./test/msg.txt', (err, stat) => {
  console.log(stat)
})

// 同步获取文件信息
// const stats = fs.statSync(path)

// fstat 在open之后获取文件信息
// fs.fstat(fd,callback(err, stat))