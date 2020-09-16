const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
  req.on('data', data => {
    console.log(decodeURIComponent(data))
    console.log(data.toString())
  })
  req.on('end', () => {
    console.log('数据接收完毕')
  })
})

server.listen('8001')