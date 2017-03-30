
var login_B = document.getElementById('login-box');
var c_B = document.getElementById('c-box');
var c_content = document.getElementById('content');
var socket = io("ws://192.168.142.13:3000");
var userName;
var msgContent = document.getElementById('message');

function init(){
	socket.on('loginSuc',function(data){
	    login_B.style.display = 'none';
	    c_B.style.display = 'block';
	    var loginText = document.createElement("div");
	    loginText.className = 'login-N';
	    loginText.innerText = data.text;
	    c_content.appendChild(loginText);
	});

	socket.on('chatRe',function(data){
		var name = document.createElement("span");
		var chatText = document.createElement("div");
		var line_box = document.createElement("div");
		name.innerText = data.userName;
		line_box.className = 'line-box';
		if(data.userName == userName){
			name.className = 'myName';
			chatText.className = 'chat-right';
		}else{
			name.className = 'otherName';
			chatText.className = 'chat-left';
		}
	    chatText.innerText = data.msg;
	    line_box.appendChild(name);
	    line_box.appendChild(chatText);
	    c_content.appendChild(line_box);
	});
}

init();


function login(){
	userName = document.getElementById('userName').value;
	if(userName == ''){
		return false;
	}else{
		socket.emit('login', {userName:userName});
	}
}

function sendMsg(){
	var msg = msgContent.value;
	if(msg == ''){
		return false;
	}else{
		socket.emit('msg',{msg : msg, userName : userName});
		msgContent.value = '';
	}
}