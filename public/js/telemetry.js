const socket = io()
const steering = document.getElementById('steering');
const button = document.getElementById('send');
const steeringWheel = document.getElementById('steeringWheel');


socket.on('steeringUpdate',(rotation)=>{
  console.log('Hello steering',rotation);
  steeringWheel.style.transform = `rotate(${rotation}deg)`;
})

socket.on('welcome',()=>{
  console.log('Hello User!');
})

button.addEventListener('click',()=>{
  socket.emit('steeringData',steering.value)
})
