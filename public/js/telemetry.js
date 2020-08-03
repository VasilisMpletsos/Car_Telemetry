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


  updateChart(data.temp1,data.temp2,data.temp3,data.temp4);
})

google.charts.load('current', {'packages':['gauge']});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

   window.data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['Engine', 0],
    ['Oil', 0],
    ['Water1', 0],
    ['Water2', 0],
  ]);

  window.options = {
    width: "300", height: "300",
    greenFrom: 0, greenTo: 85,
    redFrom: 100, redTo: 120,
    yellowFrom:85, yellowTo: 100,
    minorTicks: 8, majorTicks: '11',
    max: 120
  };

  window.chart = new google.visualization.Gauge(document.getElementById('chart_div'));
  window.chart.draw(window.data, window.options);
}

function updateChart(temp1=0,temp2=0,temp3=0,temp4=0){
  window.data.setValue(0, 1, temp1);
  window.data.setValue(1, 1, temp2);
  window.data.setValue(2, 1, temp3);
  window.data.setValue(3, 1, temp4);
  window.chart.draw(window.data, window.options);
}
