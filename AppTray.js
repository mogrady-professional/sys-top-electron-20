const { app, Menu, Tray } = require('electron');

class AppTray extends Tray {
  constructor(icon, mainWindow) {
    super(icon);
    this.mainWindow = mainWindow;

    this.setToolTip('SysTop');
    this.on('click', this.onClick);
    this.on('right-click', this.onRightClick);
  }

  onClick = () => {
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.show();
    }
  };

  onRightClick = () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => {
          app.isQuiting = true;
          this.destroy();
          app.quit();
        },
      },
    ]);
    this.popUpContextMenu(contextMenu);
  };
}

module.exports = AppTray;
