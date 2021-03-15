let fs = require("fs");

let f1KaData = fs.readFileSync("./f1.txt") + "";

let data = f1KaData.split('\r\n');
console.log(data);
let str = "";
let cnt = 1;

for(let i = 0; i < data.length; i++) {
    if(data[i] == '') {

    } else {
        console.log(data[i]);
        str += cnt;
        str += data[i];
        str += '\n';
        // str += '\n';
        cnt++;
    }
}

console.log(str);

fs.writeFileSync('./f1.txt', str);