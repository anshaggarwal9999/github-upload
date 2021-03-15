const request = require("request");
const cheerio = require("cheerio");
const getAllMatches = require("./allMatches");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595", cb);

function cb(error, response, body) {
    parseData(body);
}

function parseData(html) {
    let ch = cheerio.load(html);
    let aTag = ch('.widget-items.cta-link a');

    // console.log(aTag);

    let link = aTag.attr("href");
    // console.log(link);

    let completeLink = "https://www.espncricinfo.com" + link;

    getAllMatches(completeLink);
}