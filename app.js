const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

server.listen(3000,()=>{
  console.log('Server is listening on port 3000!');
});

io.on('connection',(socket)=>{
  console.log('New Web Socket Connection!');
  socket.emit('Welcome')
})

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
  res.redirect('html/index.html');
})
