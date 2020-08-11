const { app, BrowserWindow } = require('electron');
const path = require("path");
const url = require("url");

function createWindow () {
  let win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    frame: false,
    resizable: false
  })
  win.setMenuBarVisibility(false);
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'ui/index.html'),
    protocol: 'file:',
    slashes: true
  }));
}

app.whenReady().then(createWindow)