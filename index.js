
const {app,BrowserWindow} = require('electron')
  const path = require('path')
  const url = require('url')

  const Pusher = require('pusher')

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
    

/*
    app_id = "466192"
key = "a8caed348926f9c08aba"
secret = "6b07cb4bc18a98fea2a0"
cluster = "us2"
  */

  let pusher = new Pusher({
      appId: '466192',
      key: 'a8caed348926f9c08aba',
      secret: '6b07cb4bc18a98fea2a0',
      cluster: 'us2'
  })

  setInterval(function() {
      console.log('timeout...')
      pusher.trigger('mychannel', 
      'electron', 
      {
          message: "test from electron"
      },
       null, 
      function(err, req, res) {
          if(err) {
              console.error(err)
          }
          console.log(req)
          console.log(res)
      })
  }, 5000)

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