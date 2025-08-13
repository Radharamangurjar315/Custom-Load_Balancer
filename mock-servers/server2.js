const http = require('http');
const PORT2 = 3002;

http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from server2.js on port ' + PORT2);

})
.listen(PORT2, () => {
    console.log('Server2 is running on port ' + PORT2);
});
