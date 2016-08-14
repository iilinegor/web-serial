var SerialPort = require('serialport');
var WebSocketServer = require('ws').Server; 


var SERVER_PORT = 1010;
var wss = new WebSocketServer({host: '192.168.100.3', port: SERVER_PORT}); 
var connections = new Array;  

    portName = process.argv[2]; 
var serialOptions = {                            
      baudRate: 9600,                           
      parser: SerialPort.parsers.readline("\n") 
    };


if (typeof portName === "undefined") {
  console.log("You need to specify the serial port when you launch this script, like so:\n");
  console.log("    node wsServer.js <portname>");
  console.log("\n Fill in the name of your serial port in place of <portname> \n");
  process.exit(1);
}

var myPort = new SerialPort(portName, serialOptions);


myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);


function showPortOpen() {
  console.log('port open. Data rate: ' + myPort.options.baudRate);
}

function sendSerialData(data) {

  console.log(data);
  if (connections.length > 0) {
    broadcast(data);
  }
}

function showPortClose() {
   console.log('port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}

function sendToSerial(data) {
  console.log("sending to serial: " + data);
  myPort.write(data);
}

// ------------------------ webSocket Server event functions
wss.on('connection', handleConnection);

function handleConnection(client) {
  console.log("New Connection");       
  connections.push(client);            

  client.on('message', sendToSerial);      

  client.on('close', function() {           
    console.log("connection closed");      
    var position = connections.indexOf(client); 
    connections.splice(position, 1);        
  });
}
function broadcast(data) {
  for (c in connections) {   
    connections[c].send(JSON.stringify(data)); 
  }
}