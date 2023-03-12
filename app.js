// express
var express = require('express');
var app = express();

// event listener
var events = require('events');

// create an eventEmitter object
var eventEmitter = new events.EventEmitter();


let message = "";


// /
app.get('/', function(req, res) {
  console.log("a request coming");
  res.send('welcome to ok!');
});

// /ok 
app.get('/ok', function(req, res) {
  console.log("an ok coming");
  // emit event: onOK
  eventEmitter.emit('ok');
  res.send('ok');
});

// /notok
app.get('/notok', function(req, res) {
  console.log("an not ok coming");
  eventEmitter.emit('notok');
  res.send('not ok');
}
);

//mount folder public as static
app.use('/static', express.static('public'));

// start app
app.listen(8080, function() {
    console.log('App listening on port 8080');
}
);

// A web socket server that listens on port 8080
// once a connection is established, it sends the message: "hello"
// and then waits for a message from the client

// import the ws module
// https://www.npmjs.com/package/ws
// npm install ws
const WebSocket = require('ws');

// create a new websocket server listening on port 8080
const wss = new WebSocket.Server({ port: 8088 }, function() {
  console.log('Websocket server listening on port 8088');
});

// connection is up, let's add a simple simple event
wss.on('connection', function connection(ws) {
  // send immediatly a feedback to the incoming connection    
//  ws.send(JSON.stringify({
//    say: "connected",
//  }));
  setTimeout(function() {
    ws.send(JSON.stringify({
      say: "OK, I have done.",
    }));
  }, 1000*10);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  // listen to onOK event
  eventEmitter.on('ok', function() {
    ws.send(JSON.stringify({
      say: "OK, I have done.",
    }));
  });

  // listen to onOK event
  eventEmitter.on('notok', function() {
    ws.send(JSON.stringify({
      say: "Sorry, failed.",
    }));
  });

});



