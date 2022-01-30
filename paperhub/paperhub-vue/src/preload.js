import {contextBridge, ipcRenderer} from 'electron'

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => {
        // whitelist channels
        if (channel.startsWith('toMain')) {
            ipcRenderer.send(channel, data)
        }
    },
    receive: (channel, func) => {
        if (channel.startsWith('fromMain')) {
            // Deliberately strip event as it includes `sender`
            ipcRenderer.on(channel, (event, ...args) => func(event, ...args))
        }
    },
    once: (channel, func) => {
        if (channel.startsWith('fromMain')) {
            ipcRenderer.once(channel, (event, ...args) => func(event, ...args))
        }
    }
})