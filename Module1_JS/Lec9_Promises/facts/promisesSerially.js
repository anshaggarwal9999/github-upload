const fs = require("fs");

let f1Promise = fs.promises.readFile("./f1.txt");

f1Promise.then(function(data) {
    console.log("first Promise");

    let f2Promise = fs.promises.readFile("./f2.txt");

    f2Promise.then(function(data) {
        console.log("Second Promise");

        let f3Promise = fs.promises.readFile("./f3.txt");

        f3Promise.then(function(data) {
            console.log("Third Promise");
        })
    })
});