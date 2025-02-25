const { app, BrowserWindow, dialog, ipcMain } = require("electron");


let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        autoHideMenuBar: true,
    });

    mainWindow.loadFile("index.html");
});


ipcMain.on("select-file", async (event) => {
    const {filePaths} = await dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [{
            name: "Audio Files", extensions: ["mp3", "wav"]
        }],
    });

    if (filePaths.length > 0) {
        event.reply("file-selected", filePaths[0]);
    }

});

app.on("window-all-closed", ()=>{
    if (process.platform !== "darwin") app.quit();
});