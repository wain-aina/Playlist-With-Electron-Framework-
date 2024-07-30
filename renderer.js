const setButton = document.getElementById('submit_btn')
const artistName = document.getElementById('artistName')
const artistSong = document.getElementById('artistSong')
setButton.addEventListener('click', (event) => {
  let data = {
      artist: artistName.value,
      song: artistSong.value  
  }
  
  window.electronAPI.sendData(data)
})


