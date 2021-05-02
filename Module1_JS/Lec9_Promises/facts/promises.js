const fs = require("fs");

let pendingPromise = fs.promises.readFile("./f1.txt");

console.log(pendingPromise);//till this promise is still pending

//success callback (scb)
pendingPromise.then(function(data) {
    console.log("I am inside succes callback(scb)");
    console.log(data+"");
    //pendingPromise will store data same as the parameter data in the fucntion
    console.log(pendingPromise);
});


//failure callback (fcb)
pendingPromise.catch(function(error){
    console.log("I am inside failure callback(fcb)");
    console.log(error);
    //pendingPromise will store error same as the parameter error in the fucntion
    console.log(pendingPromise);
});