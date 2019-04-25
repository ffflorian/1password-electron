import {BrowserWindow, Menu, app, shell} from 'electron';

import {registerActions} from './actions';
import * as mainMenu from './menu';
import {BASE_URL, BrowserWindowOptions} from './static';
import {platform} from './utils';

let mainWindow: BrowserWindow | null = null;

const devtools = process.argv[2] === '--devtools';

const createWindow = async () => {
  mainWindow = new BrowserWindow(BrowserWindowOptions);
  mainWindow.on('closed', () => {
    mainMenu.unregisterShortcuts();
    mainWindow = null;
  });
  mainWindow.on('focus', () => mainMenu.registerShortcuts());
  mainWindow.on('blur', () => mainMenu.unregisterShortcuts());

  mainWindow.webContents.on('new-window', async (event, url) => {
    event.preventDefault();
    try {
      await shell.openExternal(url);
    } catch (error) {
      console.error(error);
    }
  });

  await mainWindow.loadURL(BASE_URL);

  if (devtools) {
    mainWindow.webContents.openDevTools({mode: 'detach'});
  }
};

app
  .on('activate', async () => {
    if (mainWindow === null) {
      await createWindow();
    }
  })
  .on('ready', async () => {
    registerActions();
    Menu.setApplicationMenu(mainMenu.menu);
    await createWindow();
  })
  .on('window-all-closed', () => app.quit());

if (platform.IS_LINUX) {
  app.disableHardwareAcceleration();
}
