const { createClient } =  require('@supabase/supabase-js')
const { app, BrowserWindow, ipcMain, nativeTheme } = require('electron')
const path = require('path')

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmeHFpYnpxZGhteGZudW1sa2F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTAyNTgwOTAsImV4cCI6MTk2NTgzNDA5MH0.VkdKTYSr7Mll2o3C8IBoECUWhtgVuhAhx4tzcdoh5CQ'

const SUPABASE_URL = "https://wfxqibzqdhmxfnumlkaw.supabase.co"



function createWindow () {
	const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
	console.log(app.getAppPath())
	// console.log(supabase.auth)
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('login.html')

  ipcMain.handle('login',async ()=>{
  	console.log('before supabase auth signIn')
		// let { user, session, error } = await supabase.auth.signIn({
		//   provider: 'google'
		// })
		// supabase.auth.signIn({
		//   provider: 'google'
		// }).then(({user, session, error}) => {
		// 	win.loadFile('index.html')
		// console.log('user '+user)
		// console.log('error' +error)
		// 	return user
		// })
		// console.log('second user '+user)
		// console.log('second error' +error)
		// win.loadFile('index.html')
		// return user
		// win.loadURL('https://wfxqibzqdhmxfnumlkaw.supabase.co/auth/v1/authorize?provider=google')
		win.loadURL('https://wfxqibzqdhmxfnumlkaw.supabase.co/auth/v1/authorize?provider=google')
  })

  ipcMain.handle('logout', async ()=>{
		const { error } = await supabase.auth.signOut()
		console.log(error)
  	win.loadFile('login.html')
  })

  ipcMain.handle('dark-mode:toggle', () => {
    if (nativeTheme.shouldUseDarkColors) {
      nativeTheme.themeSource = 'light'
    } else {
      nativeTheme.themeSource = 'dark'
    }
    return nativeTheme.shouldUseDarkColors
  })

  ipcMain.handle('dark-mode:system', () => {
    nativeTheme.themeSource = 'system'
  })
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