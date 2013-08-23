var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function (req, res) {
    try {// проверяем путь
	if (req.url == '/info') {
	// проверяем авторизацию
       if(req.headers['authorization'] == 'password') {
		res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});

		var now = new Date();
		var timeStr = now.getHours()+':'+now.getMinutes()+':'+now.getSeconds();

		res.end('password is true ' + timeStr);
		return;
        } else {
		res.writeHead(403, {'Content-Type': 'text/plain; charset=utf-8'});
		res.end('bad password');
	}
		return;
	} 
	file.serve(req, res);
 } catch(e) {
       console.log(e.name);
    }
}).listen(8080);

