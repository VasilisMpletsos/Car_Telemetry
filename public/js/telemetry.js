const socket = io()
const steering = document.getElementById('steering');
const button = document.getElementById('send');
const steeringWheel = document.getElementById('steeringWheel');
const rpms = document.getElementById('rpm');


socket.on('update',(data)=>{
  console.log(data);
  //Steering Wheel Section
  steeringWheel.style.transform = `rotate(${data.rotation}deg)`;

  // susp.setAttribute('transform','rotate(15 80 70)')

  //RPM Section
  let green = data.rpm / 1000;
  for(let i=1; i<13;i++){
    document.getElementById(`led${i}`).style="fill:red";
  }
  for(let i=1; i<green+1;i++){
    document.getElementById(`led${i}`).style="fill:green";
  }

  //Temprature Section
  updateChart(data.temp1,data.temp2,data.temp3,data.temp4);

  //Suspension Section
  let cfl = getColorForPercentage(data.frontLeft);
  let cfr = getColorForPercentage(data.frontRight);
  let crl = getColorForPercentage(data.rearLeft);
  let crr = getColorForPercentage(data.rearRight);
  document.getElementById('frontLeft').style=`fill:${cfl}`
  document.getElementById('frontRight').style=`fill:${cfr}`
  document.getElementById('rearLeft').style=`fill:${crl}`
  document.getElementById('rearRight').style=`fill:${crr}`
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

var percentColors = [
    { pct: 0.0, color: { r: 0x00, g: 0xff, b: 0 } },
    { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
    { pct: 1.0, color: { r: 0xff, g: 0x00, b: 0 } } ];

var getColorForPercentage = function(pct) {
    for (var i = 1; i < percentColors.length - 1; i++) {
        if (pct < percentColors[i].pct) {
            break;
        }
    }
    var lower = percentColors[i - 1];
    var upper = percentColors[i];
    var range = upper.pct - lower.pct;
    var rangePct = (pct - lower.pct) / range;
    var pctLower = 1 - rangePct;
    var pctUpper = rangePct;
    var color = {
        r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
        g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
        b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
    };
    return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
    // or output as hex if preferred
};
