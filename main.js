const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path');
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);
mongoose.connect(
    "mongodb://root:123456@127.0.0.1:27017/ElectronPlaylist?authSource=admin"
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log('Connection Error'));

const songSchema = new mongoose.Schema({
    song:String,
    artist:String
});

const Song = mongoose.model('Song', songSchema);

function createWindow () {
  const win = new BrowserWindow({
    width: 1288,
    height: 732,
    icon: __dirname + '/images/favicon-32x32.png',
    webPreferences: {
      preload: path.join(__dirname, '/preload.js'),
    }
  })

  ipcMain.on('set-data', (event, data) => {
    let newSong = new Song({
        song: data.song,
        artist: data.artist
    })
    
    newSong.save()
           .then(()=>console.log('Saved'))
           .catch(()=>console.log('Failed to save'))
  })

  ipcMain.on('get-data', (event, data)=>{
    Song.find()
        .then(data=>event.sender.send('display-data', JSON.stringify(data)))
        .catch(err=>console.log(err))
  })

  // ipcMain.on('delete-data', async (event, itemId) => {

  //   try {
  //     let found = await Song.findByIdAndDelete(itemId);
  //     // console.log(`Song with ID ${itemId} deleted successfully.`);
  //     console.log(found)
  //     //event.sender.send('song-deleted', itemId); // Send confirmation with ID
  //   } catch (err) {
  //     console.error('Error finding song:', err);
  //     //event.sender.send('delete-error', itemId); // Send error message with ID
  //   }
  // });

  //win.setMenuBarVisibility(false);
  win.loadFile('index.html')
  
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

