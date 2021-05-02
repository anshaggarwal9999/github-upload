const fs = require("fs");

let files = ["../f1.txt", "../f2.txt", "../f3.txt"];

let filePromise = fs.promises.readFile(files[0]);

for(let i = 1; i < files.length; i++) {
    filePromise = filePromise.then(function(data) {
        console.log(data+"");

        let nextPromise = fs.promises.readFile(files[i]);
        return nextPromise;
    })
}

filePromise.then(function(data) {
    console.log(data+"");
})