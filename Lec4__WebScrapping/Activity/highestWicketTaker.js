const request = require("request");

const cheerio = require("cheerio");
const fs = require("fs");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/kolkata-knight-riders-vs-rajasthan-royals-54th-match-1216530/full-scorecard" , cb);

let highestWicketTaker = {};

function cd(error, response, body) {
    parseData(body);
}

function parseData(html) {
    let highestWickets = 0;
    let name;
    let economy;

    let ch = cheerio.load(html);
    let tables = ch('.table.bowler');

}