
const {app,BrowserWindow} = require('electron')
  const path = require('path')
  const url = require('url')

//  let remote = require('remote')
  //let app2 = remote.require('app')
 // console.log(app.getAppPath())
let win
function createWindow()
{
   //Create the browser window
    win = new BrowserWindow({width: 800,height: 600})
    
    console.log(__dirname)
    //load the index.html of the app
    win.loadURL(url.format({pathname: path.join(__dirname,'index.html'),
    protocol : 'file:',
    slashes : true
    }))
    
    //open dev tools
    win.webContents.openDevTools()
    
    //window close
    win.on('closed',() => { win = null})
}

app.on('ready',createWindow)

//quit when all windows are closed
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})