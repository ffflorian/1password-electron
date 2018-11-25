import {BrowserWindow, app} from 'electron';
import * as path from 'path';
import {platform} from './utils';

const APP_PATH = app.getAppPath();
const BASE_URL = 'https://my.1password.com';
const ICON_PATH = path.join(APP_PATH, 'resources', 'icon@128x128.png');

let mainWindow: BrowserWindow | null = null;

const devtools = process.argv[2] === '--devtools';

const createWindow = () => {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    fullscreen: false,
    height: 750,
    icon: ICON_PATH,
    title: '1Password',
    webPreferences: {
      nodeIntegration: false,
      nodeIntegrationInWorker: false,
    },
    width: 1000,
  });

  mainWindow.webContents.on('will-navigate', url => console.log(url));

  mainWindow.on('closed', () => (mainWindow = null));

  mainWindow.loadURL(BASE_URL);

  if (devtools) {
    mainWindow.webContents.openDevTools();
  }
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
