const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

function getMatches(link) {
    request(link, cb);
}

function cb(error, response, body) {
    parseData(body);
}

function parseData(html) {
    let ch = cheerio.load(html);
    let bothInnings = ch('.match-scorecard-page .Collapsible');

    for(let i = 0; i < bothInnings.length; i++) {
        let inning = bothInnings[i+""];
        let teamName = ch(inning).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        console.log(teamName);

        let batsmanTable = ch(inning).find('.table.batsman');
        let allTrs = batsmanTable.find("tbody tr");
        // console.log(allTrs);

        for(let j=0 ; j<allTrs.length-1 ; j++){
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length > 1){
                // valid tds
                let batsmanName = ch(allTds['0']).text().trim();
                let runs = ch(allTds['2']).text().trim();
                let balls = ch(allTds['3']).text().trim();
                let fours = ch(allTds['5']).text().trim();
                let sixes = ch(allTds['6']).text().trim();
                let strikeRate = ch(allTds['7']).text().trim();
                // console.log(`Name : ${batsmanName} Runs : ${runs} Balls : ${balls} Fours : ${fours} Sixes : ${sixes} StrikeRate : ${strikeRate}`)
                processBatsman(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            }
        }

        // console.log(batsmanTable);
        console.log("###############################");
    }
}

function checkTeamFolder(teamName) {
    let teamPath = `./IPL/${teamName}`;
    return fs.existsSync(teamPath);
}

function createTeamFolder(teamName) {
    let teamPath = `./IPL/${teamName}`;
    fs.mkdirSync(teamPath);
}

function checkBatsmanFile(teamName, batsmanName) {
    let batsmanPath = `./IPL./${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}

function createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, strikeRate) {
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs,
        balls : balls,
        Fours : fours,
        Sixes : sixes,
        StrikeRate : strikeRate
    }

    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath, JSON.stringify(batsmanFile));
}

function updateBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, strikeRate) {
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let stringifiedData = fs.readFileSync(batsmanPath);
    let batsmanFile = JSON.parse(stringifiedData);
    let inning = {
        Runs : runs,
        balls : balls,
        Fours : fours,
        Sixes : sixes,
        StrikeRate : strikeRate
    }

    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath, JSON.stringify(batsmanFile));
}

function processBatsman(teamName, batsmanName, runs, balls, fours, sixes, strikeRate) {
    let isTeam = checkTeamFolder(teamName);
    if(isTeam) {
        let isBatsman = checkBatsmanFile(teamName, batsmanName);
        if(isBatsman) {
            updateBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);
        }
        else {
            createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);
        }
    }
    else {
        createTeamFolder(teamName);
        createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes, strikeRate);
    }
}

module.exports = getMatches;