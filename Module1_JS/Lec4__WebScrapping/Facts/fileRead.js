const fs = require("fs");
const cheerio = require("cheerio");

let htmlData = fs.readFileSync("./index.html");
// console.log(htmlData);

let ch = cheerio.load(htmlData);

let pTags = ch("p").text();

console.log(pTags);