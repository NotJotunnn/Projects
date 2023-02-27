const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('consoleHelloAPI', {
    console: () => ipcRenderer.send('HelloAPI'),
    // answer: () => ipcRenderer.on('responseAPI', (e) => console.log(e))
    // TO-DO: Discover how to pass this data into the renderer
})