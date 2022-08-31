const { BrowserWindow } = require('electron');

class MainWindow extends BrowserWindow {
  constructor(file, isDev) {
    super({
      title: 'SysTop',
      width: isDev ? 1500 : 550,
      height: isDev ? 850 : 650,
      icon: `${__dirname}/assets/icons/icon.png`,
      resizable: isDev ? true : false,
      show: true,
      opacity: 0.9,
      backgroundColor: 'white',
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    this.loadFile(file);

    if (isDev) {
      this.webContents.openDevTools();
    }
  }
}

module.exports = MainWindow;
