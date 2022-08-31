const path = require('path');
const { app, Menu, ipcMain } = require('electron');
const log = require('electron-log');
const Store = require('./Store');
const MainWindow = require('./MainWindow');
const AppTray = require('./AppTray');

// Set env
process.env.NODE_ENV = 'production'; // development or production

const isDev = process.env.NODE_ENV !== 'production' ? true : false;
const isMac = process.platform === 'darwin' ? true : false;

let mainWindow;
let tray;

// Init store & defaults
const store = new Store({
  configName: 'user-settings',
  defaults: {
    settings: {
      cpuOverload: 80,
      alertFrequency: 5,
    },
  },
});

function createMainWindow() {
  mainWindow = new MainWindow('./app/index.html', isDev);
}

app.on('ready', () => {
  createMainWindow();

  mainWindow.webContents.on('dom-ready', () => {
    mainWindow.webContents.send('settings:get', store.get('settings'));
    // console.log(store.get('settings'));
  });

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  const icon = path.join(__dirname, 'assets/icons/tray_icon.png');

  // create tray
  tray = new AppTray(icon, mainWindow);

  mainWindow.on('close', (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      mainWindow.hide();
      tray.destroy();
    }

    return true;
  });

  // Minimize to tray
  mainWindow
    .on('minimize', (e) => {
      e.preventDefault();
      mainWindow.hide();
    })
    .on('restore', (e) => {
      e.preventDefault();
      mainWindow.show();
    });
});

const menu = [
  ...(isMac ? [{ role: 'appMenu' }] : []),
  {
    role: 'fileMenu',
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Toggle Navigation',
        click: () => mainWindow.webContents.send('nav:toggle'),
      },
    ],
  },
  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' },
          ],
        },
      ]
    : []),
];

// Set settings
ipcMain.on('settings:set', (e, value) => {
  store.set('settings', value);
  mainWindow.webContents.send('settings:get', store.get('settings')); // Send settings to mainWindow
}),
  app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit();
    }
  });

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

app.allowRendererProcessReuse = true;
