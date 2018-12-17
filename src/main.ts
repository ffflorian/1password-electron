import {BrowserWindow, Menu, app, session, shell} from 'electron';

import {registerActions} from './actions';
import * as mainMenu from './menu';
import {BASE_URL, BrowserWindowOptions, USER_AGENT} from './static';
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

  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  const defaultSession = session.defaultSession;
  if (defaultSession) {
    defaultSession.webRequest.onBeforeSendHeaders({urls: ['*']}, (details: any, callback: (data: any) => void) => {
      details.requestHeaders['User-Agent'] = USER_AGENT;
      callback({cancel: false, requestHeaders: details.requestHeaders});
    });
  }

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
