// a websocket client to connect to the server, and receive the message from the server
// once the client receives the message, it will print the message to the console
console.log("start ...");
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:3001');
ws.on('open', function open() {
  ws.send('something');
});
ws.on('message', function incoming(data) {
  console.log(data);
  // convert the message from buffer to string
  console.log(data.toString());
});
console.log("listenning ...");
