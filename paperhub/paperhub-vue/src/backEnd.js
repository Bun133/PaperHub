const fs = require('fs');
const path = require('path');
const configFileName = 'config.json';

export function main(ipcMain, userDataDir,window) {
    ipcMain.on("toMain@loadConfig", async (event) => {
        try {
            let data = fs.readFileSync(path.join(userDataDir, configFileName), 'utf8');
            event.reply("fromMain@loadConfig-reply", JSON.parse(data));
        } catch (e) {
            event.reply("fromMain@loadConfig-reply", undefined);
        }
    });

    ipcMain.on("toMain@saveConfig", async (event, arg) => {
        fs.writeFileSync(path.join(userDataDir, configFileName), JSON.stringify(arg), 'utf8');
    });

    ipcMain.on("toMain@openNewWindow", async (event, arg) => {
        await window.loadURL(arg);
    });
}