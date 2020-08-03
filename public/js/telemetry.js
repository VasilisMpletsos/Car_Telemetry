const socket = io()
const steering = document.getElementById('steering');
const button = document.getElementById('send');
const steeringWheel = document.getElementById('steeringWheel');
const rpms = document.getElementById('rpm');


socket.on('update',(data)=>{
  //Steering Wheel Section
  steeringWheel.style.transform = `rotate(${data.rotation}deg)`;



  //RPM Section
  let green = data.rpm / 1000;
  for(let i=1; i<13;i++){
    document.getElementById(`led${i}`).style="fill:red";
  }
  for(let i=1; i<green+1;i++){
    document.getElementById(`led${i}`).style="fill:green";
  }


  drawChart(data.temp1,data.temp2,data.temp3,data.temp4);
})

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);


function drawChart(temp1=0,temp2=0,temp3=0,temp4=0) {

  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Engine', temp1],
    ['Oil', temp2],
    ['Water In', temp3],
    ['Water Out', temp4],
  ]);

  let options = {
    width: "300", height: "300",
    redFrom: 90, redTo: 120,
    yellowFrom:75, yellowTo: 90,
    minorTicks: 5
  };

  var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
  chart.draw(data, options);
}
