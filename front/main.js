const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
	const win = new BrowserWindow({
	  webPreferences:{
		nodeIntegration: true,
		contextIsolation: false
	  }
	})
	const pathName = path.join("build", 'index.html');
	win.loadFile(`${app.getAppPath()}\\build\\index.html`);
}

app.whenReady().then(() => {
	createWindow()
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})