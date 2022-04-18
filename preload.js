const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld('darkMode', {
//   toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
//   system: () => ipcRenderer.invoke('dark-mode:system')
// })

contextBridge.exposeInMainWorld('auth', {
  login: () => ipcRenderer.invoke('login'),
  logout: () => ipcRenderer.invoke('logout')
})