const { app, BrowserWindow } = require('electron');
const path = require("path");
const url = require("url");

require('@electron/remote/main').initialize()


function createWindow () {
  let win = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
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
  
require("@electron/remote/main").enable(win.webContents)
}

app.whenReady().then(createWindow)