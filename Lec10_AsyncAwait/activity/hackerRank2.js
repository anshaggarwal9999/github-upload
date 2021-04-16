const fs = require("fs");
const { type } = require("os");
const puppeteer = require("puppeteer");
let challenges = require("./challenges.js");

(async function() {
    let browser = await puppeteer.launch({headless : false, 
        defaultViewport:null, 
        args : ["--start-maximized"]
    });

    let allPages = await browser.pages();
    let tab = allPages[0];

    await tab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");//will open the google homepage
    await tab.type("#input-1", "biyofom220@aramidth.com");
    // let pswd = tab.type("#input-2", "123456");
    await tab.type("#input-2", "123456");
    await tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');

    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]', {visible : true});
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');

    await tab.waitForSelector('[data-analytics="NavBarProfileDropDownAdministration"]', {visible : true});
    await tab.click('[data-analytics="NavBarProfileDropDownAdministration"]');

    await tab.waitForSelector('.nav-tabs.nav.admin-tabbed-nav a', {visible : true});

    let allATags = await tab.$$('.nav-tabs.nav.admin-tabbed-nav a');

    let manageLink = allATags[1];

    await manageLink.click();

    await tab.waitForSelector('.btn.btn-green.backbone.pull-right');
    let challengeBtn = await tab.$('.btn.btn-green.backbone.pull-right');

    // let challengeCompleteLink = "https://www.hackerrank.com/administration/challenges" + challengesLink;
    // console.log(challengeCompleteLink+"");

    // await tab.waitForSelector('.btn.btn-green.backbone.pull-right' , {visible:true});
    // let createChallengeBtn = await tab.$('.btn.btn-green.backbone.pull-right');
    // console.log(challengeBtn);

    let challengeBtnLink = await tab.evaluate(function(elem) {
        return elem.getAttribute("href");
    }, challengeBtn);

    let completeLink = 'https://www.hackerrank.com'+challengeBtnLink;
    console.log(completeLink);

    // await addChallenge(challenges[0], browser, completeLink);

    //Serially add all the challenges

    // for(let i = 0; i < challenges.length; i++) {
    //     await addChallenge(challenges[i], browser, completeLink);
    // }

    // await tab.goto("https://www.hackerrank.com/administration/challenges");

    await tab.waitForSelector('.backbone.block-center');

    let allQuestions = await tab.$$('.backbone.block-center');

    // console.log(allQuestions);
    for(let j = 0; j < allQuestions.length; j++) {
        let allQuestionsLink = await tab.evaluate(function(elem) {
            return elem.getAttribute("href");
        }, allQuestions[j]);
    
        let complete = 'https://www.hackerrank.com' + allQuestionsLink;
    
        await addModerator(browser, tab, complete);
    }

})();

async function addModerator(browser, tab, questionLink) {
    let newTab = await browser.newPage();

    await newTab.goto(questionLink);
    await newTab.waitForTimeout(2000);
    await newTab.close();
}

async function addChallenge(challenge, browser, completeLink) {
    let newTab = await browser.newPage();
    await newTab.goto(completeLink);

    await newTab.waitForSelector('#name', {visible : true});
    
    await newTab.waitForTimeout(3000);
    
    await newTab.type('#name', challenge["Challenge Name"]);
    await newTab.type('#preview', challenge["Description"]);
    await newTab.type('#problem_statement-container .CodeMirror textarea', challenge["Problem Statement"]);
    await newTab.type('#problem_statement-container .CodeMirror>div', challenge["Problem Statement"]);
    await newTab.type('#input_format-container .CodeMirror textarea', challenge["Input Format"]);
    await newTab.type('#constraints-container .CodeMirror textarea', challenge["Constraints"]);
    await newTab.type('#output_format-container .CodeMirror textarea', challenge["Output Format"]);
    await newTab.type('#tags_tag', challenge["Tags"]);
    await newTab.keyboard.press("Enter");
    await newTab.click('.save-challenge.btn.btn-green');

    await newTab.close();
}