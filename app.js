const {app, BrowserWindow, ipcMain } = require('electron')
    const url = require("url");
    const path = require("path");

    global.share = {ipcMain}

    let mainWindow
    console.log("creating window..")

    function createWindow () {
      mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
          nodeIntegration: true,
          preload: path.join(__dirname, `preload.js`)
        },
      })

      mainWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, `dist/saki-naturals/index.html`),
          protocol: "file:",
          slashes: true
        })
      );
      // Open the DevTools.
      mainWindow.webContents.openDevTools()

      mainWindow.on('closed', function () {
        mainWindow = null
      })
    }

    ipcMain.handle('close-main-window', async (evt) => {
      mainWindow.close();
    });

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
      if (mainWindow === null) createWindow()
    })