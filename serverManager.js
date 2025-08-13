let servers = [
  { host: 'localhost', port: 3001, healthy: true, activeConnections: 0 },
  { host: 'localhost', port: 3002, healthy: true, activeConnections: 0 },
  { host: 'localhost', port: 3003, healthy: true, activeConnections: 0 }
];

function getNextServer() {
  const healthyServers = servers.filter(s => s.healthy);

  if (healthyServers.length === 0) return null;

  // Use least connections
  return healthyServers.reduce((prev, curr) => {
    return (curr.activeConnections < prev.activeConnections) ? curr : prev;
  });
}

function markConnection(server, change) {
  server.activeConnections += change;
}

module.exports = {
  servers,
  getNextServer,
  markConnection
};