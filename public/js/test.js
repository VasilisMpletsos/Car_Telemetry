const socket = io()


while(true){
 var degrees = Math.floor((Math.random()*181)-90);
 sleepFor(500);
 $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: '/update',
    data: JSON.stringify({rotation: degrees})
  });
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}
