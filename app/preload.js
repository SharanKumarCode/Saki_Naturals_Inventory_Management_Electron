const { ipcRenderer } = require('electron');

  // We only pass closeWindow to be used in the renderer page, rather than passing the entire ipcRenderer, which is a security issue
  const closeWindow = async () => {
     await ipcRenderer.invoke('close-main-window'); // We don't actually need async/await here, but if you were returning a value from `ipcRenderer.invoke` then you would need async/await
  }

  window.api = {
    closeWindow
  }