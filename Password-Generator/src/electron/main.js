const { app, BrowserWindow, Tray, ipcMain } = require('electron');

const Store = require('electron-store');

const { resolve, join } = require('path');

const Theme = require('./storage');

const store = new Store();

iconPath = resolve(__dirname, '../', 'assets', 'padlock_tray.png')

const createWindow = () => {
  
  const win = new BrowserWindow({
    width: 410,
    height: 290,
    show: false,
    frame: false,
    resizable: false,
    fullscreenable: false,
    webPreferences: {
      preload: join(__dirname, './preload.js')
    },
  })


  // TO-DO: Discover how to actually pass data
  ipcMain.on('HelloAPI', () => {
    console.log('hey')

    // let darkmode = store.set('darkmode', 'dark');
    // const response = darkmode.JSON.stringfy
    // ipcMain.send('responseAPI', response)
  })
  
  // win.webContents.openDevTools();
  
  win.loadFile(join(__dirname ,'../pages/index.html'))
  
  const tray = new Tray(iconPath)
  tray.setToolTip('Password Generator')
  
  tray.on('click', toggle)
  
  win.on('blur', win.hide)
  
  function toggle() {
    if(win.isVisible()) {
      win.hide()
    } else {
      show()
    }
  }
  
  function show() {
    const {x, y} = getPosition()
    
    win.setPosition(x, y, false)
    
    win.show()
    win.focus()
  }
  
  function getPosition() {

    const winBounds = win.getBounds()
    const trayBounds = tray.getBounds()
    
    const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (winBounds.width / 2))
    
    const y = Math.round(trayBounds.y + trayBounds.height + 3)
    
    return {x, y}
  }
}


app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.dock.hide()