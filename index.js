
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ejs = require('ejs');
var path = require('path');



app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

// var express = require('express');
// var router = express.Router();


// router.get('/', function(req, res, next) {
//   res.sendFile('index.html');
// });

// app.get('/', function(req, res){
// 	res.send('<h1>Welcome Realtime Server</h1>');
// });

app.get('/', function(req, res){
	res.render('index', { title: '聊天室' });
});

var userId = 1;

io.on('connection',function(socket){
	socket.on('login',function(data){
		io.sockets.emit('loginSuc',{text:data.userName + ',欢迎您进入聊天室'});
	})

	socket.on('msg',function(data){
		io.sockets.emit("chatRe",data);
	})
})

http.listen(3000, function(){
	console.log('listening on *:3000');
});