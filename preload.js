const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld( 'electronapi', {
    send: ( channel ) => ipcRenderer.invoke( channel )
} )