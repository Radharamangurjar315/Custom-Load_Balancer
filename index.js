const http = require('http');
const { createProxyServer } = require('http-proxy');
const { servers, getNextServer, markConnection } = require('./serverManager');
const { startHealthCheck } = require('./healthCheck');

const proxy = createProxyServer();

const server = http.createServer((req, res) => {
  const target = getNextServer();

  if (!target) {
    res.writeHead(503);
    return res.end("No healthy servers available");
  }

  const targetUrl = `http://${target.host}:${target.port}`;
  console.log(`Routing request to ${targetUrl}`);

  markConnection(target, +1); // Increase connection count

  proxy.web(req, res, { target: targetUrl }, (err) => {
    console.error(`Error forwarding to ${targetUrl}:`, err.message);
    res.writeHead(502);
    res.end("Bad Gateway");
  });

  res.on('finish', () => {
    markConnection(target, -1); // Decrease after response ends
  });
});

server.listen(8000, () => {
  console.log("Load Balancer running on port 8000");
  startHealthCheck(); // Start active health checks
});

const express = require('express');
const apiRoutes = require('./routes');

const adminApp = express();
adminApp.use(express.json()); // to parse JSON body
adminApp.use('/', apiRoutes);

adminApp.listen(9000, () => {
  console.log("Admin API running on port 9000");
});
