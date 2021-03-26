const puppeteer = require("puppeteer");
let tab;

let browserPromise = puppeteer.launch({headless : false, 
    defaultViewport:null, 
    args : ["--start-maximized"]
});

browserPromise.then(function(browser) {
    console.log("Browser Opened!!!!");//will open the browser
    // console.log(browser);

    let allPagesPromise = browser.pages();//will fetch the pages and return an array of pages
    return allPagesPromise;
})
.then(function(pages) {
    tab = pages[0];
    let pageOnePromise = tab.goto("https://www.hackerrank.com/auth/login?h_l=body_middle_left_button&h_r=login");//will open the google homepage
    return pageOnePromise;
})
.then(function() {
    let signUpEmail = tab.type("#input-1", "biyofom220@aramidth.com");
    // let pswd = tab.type("#input-2", "123456");

    return signUpEmail;
})
.then(function() {
    let pswd = tab.type("#input-2", "123456");

    return pswd;
})
.then(function() {
    let logIn = tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');

    return logIn;

    // let loginPromise = tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
    return loginPromise;
})
.catch(function(error) {
    console.log(error);
})