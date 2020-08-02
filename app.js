const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// parse application/json
app.use(bodyParser.json());

server.listen(3000,()=>{
  console.log('Server is listening on port 3000!');
});

app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
  res.redirect('html/index.html');
})

app.post('/update',(req,res)=>{
  let rotation = req.body.rotation;
  io.emit('steeringUpdate',rotation);
  res.send(
    {success: 'Sucess',
      info: 'Data were sent'
    })
})
