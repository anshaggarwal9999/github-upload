const puppeteer = require("puppeteer");

let browserPromise = puppeteer.launch({headless : false});

browserPromise.then(function(browser) {
    console.log("Browser Opened!!!!");//will open the browser
    console.log(browser);

    let allPagesPromise = browser.pages();//will fetch the pages and return an array of pages
    return allPagesPromise;
})
.then(function(pages) {
    let tab = pages[0];
    let pageOnePromise = tab.goto("https://www.google.com");//will open the google homepage
    return pageOnePromise;
})
.then(function() {
    console.log("Google HomePage Opened!!!");
})
//catch for all the functions
.catch(function(error) {
    console.log(error);
})