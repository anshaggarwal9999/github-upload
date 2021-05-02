const fs = require("fs");

let content = process.argv.slice(2); // will take the contents from array from index 2 to the end

console.log(content);

let flags = [];
let files = [];

for(let i = 0; i < content.length; i++) {
    if(content[i].startsWith('-')) {
        flags.push(content[i]);
    } else {
        files.push(content[i]);
    }
}

console.log(files);
console.log(flags);

//for content extraction of files
let fileData = "";

for(let i = 0; i < files.length; i++) {
    fileData += fs.readFileSync(files[i]) + "" + '\n';
}

console.log(fileData);