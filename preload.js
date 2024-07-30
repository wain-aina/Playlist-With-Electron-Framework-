const { contextBridge, ipcRenderer } = require('electron/renderer')

function requestDataFromMain() {
  ipcRenderer.send('get-data');
}

function displayData(data){
  for(let i=0; i<data.length;i++){
    const dataList = document.querySelector('.stuff-list');

    const listItem = document.createElement('li');
    listItem.classList.add('listItem');

    const songTitle = document.createElement('h2');
    songTitle.textContent = data[i].song;
    listItem.appendChild(songTitle);

    const artist = document.createElement('p');
    artist.textContent = data[i].artist;
    listItem.appendChild(artist);

    const deleteBtnContainer = document.createElement('div');
    deleteBtnContainer.classList.add('deleteBtn');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn_delete');
    deleteButton.type = 'submit';
    deleteButton.value = data[i]._id;

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa', 'fa-trash', 'fa-2x');
    deleteButton.appendChild(deleteIcon);

    deleteBtnContainer.appendChild(deleteButton);
    listItem.appendChild(deleteBtnContainer);

    dataList.appendChild(listItem);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  requestDataFromMain();
  ipcRenderer.on('display-data', (event, data) => displayData(JSON.parse(data)));
});

contextBridge.exposeInMainWorld('electronAPI', {
  sendData: (data) => ipcRenderer.send('set-data', data)
})




