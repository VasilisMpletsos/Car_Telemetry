const socket = io()

while(true){
 let rotation = Math.floor((Math.random()*181)-90);
 let rpm = Math.floor(Math.random()*9000+3001);
 let temp1 = Math.floor(Math.random()*120);
 let temp2 = Math.floor(Math.random()*120);
 let temp3 = Math.floor(Math.random()*120);
 let temp4 = Math.floor(Math.random()*120);
 sleepFor(2000);
 $.ajax({
    type: "POST",
    contentType: "application/json; charset=utf-8",
    url: '/update',
    data: JSON.stringify({rotation,rpm,temp1,temp2,temp3,temp4})
  });
}

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ }
}
