import {BrowserWindow, Menu, app} from 'electron';

import {registerActions} from './actions';
import * as mainMenu from './menu';
import {BASE_URL, BrowserWindowOptions} from './static';
import {platform} from './utils';

let mainWindow: BrowserWindow | null = null;

const devtools = process.argv[2] === '--devtools';

const createWindow = () => {
  mainWindow = new BrowserWindow(BrowserWindowOptions);
  mainWindow.on('closed', () => {
    mainMenu.unregisterShortcuts();
    mainWindow = null;
  });
  mainWindow.on('focus', () => mainMenu.registerShortcuts());
  mainWindow.on('blur', () => mainMenu.unregisterShortcuts());

  mainWindow.loadURL(BASE_URL);

  if (devtools) {
    mainWindow.webContents.openDevTools({mode: 'detach'});
  }
};

app
  .on('activate', () => {
    if (mainWindow === null) {
      createWindow();
    }
  })
  .on('ready', () => {
    registerActions();
    Menu.setApplicationMenu(mainMenu.menu);
    createWindow();
  })
  .on('window-all-closed', () => app.quit());

if (platform.IS_LINUX) {
  app.disableHardwareAcceleration();
}
