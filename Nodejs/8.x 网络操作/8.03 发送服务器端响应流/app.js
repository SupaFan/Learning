const http = require('http')

// http.createServer((req, res) => {
//   console.log(req.method);
//   console.log(req.headers);
//   res.writeHead(200, {'Content-Type': 'text-plain'})
//   res.end('hello world \n')
// }).listen(8012)

var server = http.createServer()

server.on('request', (req, res) => {
  res.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
  res.end('hello world ! \n')
}).listen(8012, 0)


