// a websocket client to connect to the server, and receive the message from the server
// once the client receives the message, it will print the message to the console
console.log("start ...");
const WebSocket = require('ws');



(async function(){


// execute system command to get the ip address of the server
const ip = await (new Promise((resolve, reject) => {
const { exec } = require('child_process');
exec(`aliyun ecs DescribeInstances | jq '\''.Instances.Instance[] | select(.InstanceName=="launch-advisor-20231121") | .PublicIpAddress.IpAddress[0]'\'' -r`, (err, stdout, stderr) => {
  if (err) {
    console.log("error: " + err);
    return;
  }
  console.log("stdout: " + stdout);
  resolve(stdout);
});
}));

console.log("ip: " + ip);


const ws = new WebSocket(`ws://${ip}:${process.env.PORT || 8080}`);
ws.on('open', function open() {
  ws.send('something');
});
ws.on('message', function incoming(data) {
  console.log(data);
  // convert the message from buffer to string
  console.log(data.toString());

  const json = JSON.parse(data.toString());

  console.log("json: ", json);

  if(json.say){
    const { exec } = require('child_process');
    exec(`say ${json.say}}`, (err, stdout, stderr) => {
      if (err) {
        console.log("error: " + err);
        return;
      }
      console.log("stdout: " + stdout);
    });
  }
  
});



//// send message to the server every 5 seconds
//setInterval(() => {
//  console.log("heartbeat", new Date());
//  // reset ping pong
//  ws.once('pong', () => {
//    console.log("pong", new Date());
//  });
//
//  // if the server does not response to the ping message in 5 seconds, close the connection
//  const timerToWaitForPong = setTimeout(() => {
//    console.log("timeout", new Date());
//    ws.terminate();
//  }, 5000);
//  ws.once('ping', () => {
//    console.log("ping", new Date());
//    clearTimeout(timerToWaitForPong);
//  });
//
//  //ping the server
//  ws.ping();
//}, 1000 * 30);

const beatInterval = 10;

function pingPong(){

ws.ping();

const timerToWaitForPong = setTimeout(() => {
  console.log("timeout, quit!", new Date());
  ws.terminate();
  process.exit(1);
}, 5000);

ws.once('pong', () => {
  console.log("pong", new Date());
  clearTimeout(timerToWaitForPong);
  setTimeout(pingPong, 1000 * beatInterval);
});

}

setTimeout(pingPong, 1000 * beatInterval);


console.log("listenning ...");
}());
