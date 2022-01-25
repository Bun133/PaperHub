export function main(ipcMain) {
    ipcMain.on("toMain", (event, arg) => {
        console.log(arg);
        event.reply("fromMain", arg);
    });
}