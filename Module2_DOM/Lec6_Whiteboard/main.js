const { BrowserWindow } = require("electron");
const electron = require("electron");

const app = electron.app;
const browserWindow = electron.BrowserWindow;

function createWindow() {
    const mainwindow = new BrowserWindow({
        width : 800,
        height : 600,
        webPreferences : {
            nodeIntegration : true
        }
    })

    mainwindow.loadFile("./public/index.html").then(function() {
        mainwindow.webContents.openDevTools();
        mainwindow.maximize();

    });
}

app.whenReady().then(function() {
    createWindow();
})