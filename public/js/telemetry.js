const socket = io()
const steering = document.getElementById('steering');
const button = document.getElementById('send');
const steeringWheel = document.getElementById('steeringWheel');
const rpms = document.getElementById('rpm');


socket.on('steeringUpdate',(rotation)=>{
  steeringWheel.style.transform = `rotate(${rotation}deg)`;
})

socket.on('rpmUpdate',(rpm)=>{
  rpms.innerHTML = '';
  let green = rpm / 1000;
  let red = 12-green;
  console.log(green);
  console.log(red);
  for(let i=0;i<green;i++){
    let add = document.createElement('img');
    add.setAttribute('src','/images/green.png');
    add.setAttribute('width','7%');
    add.setAttribute('height','7%');
    rpms.appendChild(add);
  }
  for(let i=0;i<red;i++){
    let add = document.createElement('img');
    add.setAttribute('width','6%');
    add.setAttribute('height','6%');
    add.setAttribute('src','/images/red.png')
    rpms.appendChild(add);
  }
})
