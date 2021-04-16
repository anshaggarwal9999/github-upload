const fs = require("fs");

(async function() {
    let f1Data = fs.promises.readFile("./f1.txt");
    let f2Data = fs.promises.readFile("./f2.txt");

    // console.log(f1Data+"");
    // console.log(f2Data+"");

    let allData = await Promise.all([f1Data, f2Data]);

    console.log(allData+"");
})();