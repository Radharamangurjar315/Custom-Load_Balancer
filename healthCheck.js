const http = require('http');
const { servers } = require('./serverManager');

function checkHealth(server) {
  return new Promise(resolve => {
    const options = {
      host: server.host,
      port: server.port,
      timeout: 2000,
      path: '/',
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      server.healthy = (res.statusCode === 200);
      resolve();
    });

    req.on('error', () => {
      server.healthy = false;
      resolve();
    });

    req.end();
  });
}

function startHealthCheck() {
  setInterval(() => {
    servers.forEach(s => {
      checkHealth(s);
    });
  }, 5000); // Every 5s
}

module.exports = { startHealthCheck };
