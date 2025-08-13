const http = require('http');
const PORT3 = 3003;

http.createServer((req,res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello from server3.js on' + PORT3);

})
.listen(PORT3, () => {
    console.log('Server3 is running on ' + PORT3);
});
