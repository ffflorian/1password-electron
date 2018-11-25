import {BrowserWindowConstructorOptions, app} from 'electron';
import * as path from 'path';

export const APP_PATH = app.getAppPath();
export const BASE_URL = 'https://my.1password.com';
export const ICON_PATH = path.join(APP_PATH, 'resources', 'icon@128x128.png');
export const BrowserWindowOptions: BrowserWindowConstructorOptions = {
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
};
