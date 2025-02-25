const { ipcRenderer } = require('electron');

document.getElementById("select-file").addEventListener("click", () => {
    ipcRenderer.send("select-file");
});

ipcRenderer.on("file-selected", (event, filePath) => {
    const audioPlayer = document.getElementById("audio-player");
    audioPlayer.src = filePath;
    audioPlayer.play();
})