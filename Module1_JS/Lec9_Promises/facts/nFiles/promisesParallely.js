let fs = require("fs");

let allFiles = ["../f1.txt", "../f2.txt", "../f3.txt"];

for(let i = 0; i < allFiles.length; i++) {
    let filePromise = fs.promises.readFile(allFiles[i]);
    
    filePromise.then(function(data) {
        console.log(data+"");
    })
}