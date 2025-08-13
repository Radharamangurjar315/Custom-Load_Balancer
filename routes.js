const express = require('express');
const router = express.Router();
const { servers } = require('./serverManager');


router.post('/servers', (req, res) => {
  const { host, port } = req.body;
  servers.push({ host, port, healthy: true, activeConnections: 0 });
  res.json({ message: 'Server added' });
});


router.delete('/servers/:port', (req, res) => {
  const port = parseInt(req.params.port);
  const index = servers.findIndex(s => s.port === port);
  if (index !== -1) {
    servers.splice(index, 1);
    res.json({ message: 'Server removed' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.get('/list-servers', (req, res) => {
  res.json(servers);
}); 

module.exports = router;
