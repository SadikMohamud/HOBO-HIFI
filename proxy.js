const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: 'http://127.0.0.1:3001' });});

console.log("Proxy listening on 0.0.0.0:8080 -> localhost:3000");
server.listen(8080, '0.0.0.0');
proxy.on('error', (err, req, res) => {
  res.writeHead(500, { 'Content-Type': 'text/plain' });
  res.end('Proxy Error');
});
