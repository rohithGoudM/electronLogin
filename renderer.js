document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})

// document.getElementById('loginWithGoogle').addEventListener('click', async () => {
//   document.getElementById('console').innerHTML = 'btn clicked'
//   const user = await window.auth.login()
//   document.getElementById('userDetails').innerHTML = user
// })

// document.getElementById('logout').addEventListener('click', async ()=>{
// 	await window.auth.logout()
// })