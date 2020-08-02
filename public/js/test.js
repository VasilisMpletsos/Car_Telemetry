const socket = io()

while(true){
 let degrees = Math.floor((Math.random()*181)-90);
 let rpm = Math.floor(Math.random()*13000);
 sleepFor(4000);
 $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: '/updateSteering',
    data: JSON.stringify({rotation: degrees})
  });

  $.ajax({
     type: "POST",
     contentType: "application/json; charset=utf-8",
     url: '/updateRpm',
     data: JSON.stringify({rpm: rpm})
   });
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}
