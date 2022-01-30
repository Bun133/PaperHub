import {BrowserWindow} from "electron";

const fs = require('fs');
const path = require('path');
const configFileName = 'config.json';
const dl = require('electron-dl');

export function main(ipcMain, userDataDir, window, dialog) {
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

    ipcMain.on("toMain@openFolderDialog", async (event, title) => {
        let result = await dialog.showOpenDialog(
            {
                title: title,
                properties: ['openDirectory']
            }
        )
        event.reply("fromMain@openFolderDialog-reply", result.filePaths[0]);
    });

    ipcMain.on("toMain@DownloadFile", async (event, arg) => {
        if (!arg["url"] || !arg["directory"]) {
            return;
        }
        const win = BrowserWindow.getFocusedWindow()
        await dl.download(win, arg['url'], {
            directory: arg['directory'],
            openFolderWhenDone: false,
            showBadge: false,
            onCompleted: (dl) => {
                event.reply("fromMain@DownloadFile-complete", dl);
            },
            onProgress: (progress) => {
                event.reply("fromMain@DownloadFile-progress", progress.percent);
            }
        });
    });
}