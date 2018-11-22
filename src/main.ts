import * as path from 'path';
import {app, BrowserWindow} from 'electron';

const platform = {
  IS_LINUX: process.platform === 'linux',
  IS_MAC_OS: process.platform === 'darwin',
  IS_WINDOWS: process.platform === 'win32',
};

const APP_PATH = app.getAppPath();
const BASE_URL = 'https://my.1password.com';
const ICON_PATH = path.join(APP_PATH, 'resources', 'icon.png');

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    fullscreen: false,
    height: 750,
    icon: ICON_PATH,
    width: 1000,
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
    },
  });

  mainWindow.on('closed', () => (mainWindow = null));

  mainWindow.loadURL(BASE_URL);
};

app
  .on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  })
  .on('ready', () => createWindow())
  .on('window-all-closed', () => {
    app.quit();
  });

if (platform.IS_LINUX) {
  app.disableHardwareAcceleration();
}
