const http = require('http')

// http.createServer((req, res) => {
//   console.log(req.method);
//   console.log(req.headers);
//   res.writeHead(200, {'Content-Type': 'text-plain'})
//   res.end('hello world \n')
// }).listen(8012)

var server = http.createServer()

server.on('request', (req, res) => {
  console.log(req.method)
  console.log(req.url)
  console.log(req.httpVersion)
  console.log(req.trailers)
  res.end('hello world ! \n')
}).listen(8012, 0)

server.on('connection', (socket) => {
  console.log('连接中')
})

server.on('listening', () => {
  console.log('监听中')
})
// 关闭服务器
// server.close()
server.on('close', ()=>{
  console.log('连接关闭')
})

server.setTimeout(6000, socket => {
  console.log('服务器超时')
})