const http = require('http');
const PORT1 = 3001;

http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from server1.js on port ' + PORT1);

})
.listen(PORT1, () => {
    console.log('Server1 is running on port ' + PORT1);
});
