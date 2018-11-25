import {BrowserWindowConstructorOptions, app} from 'electron';
import * as path from 'path';

enum ACTION {
  COPY_USERNAME = 'COPY_USERNAME',
  COPY_PASSWORD = 'COPY_PASSWORD',
  SHOW_DEVTOOLS = 'SHOW_DEVTOOLS',
}

const APP_PATH = app.getAppPath();
const BASE_URL = 'https://my.1password.com';
const ICON_PATH = path.join(APP_PATH, 'resources', 'icon@128x128.png');

const BrowserWindowOptions: BrowserWindowConstructorOptions = {
  autoHideMenuBar: false,
  fullscreen: false,
  height: 850,
  icon: ICON_PATH,
  title: '1Password',
  webPreferences: {
    nodeIntegration: false,
    nodeIntegrationInWorker: false,
  },
  width: 1200,
};

export {ACTION, APP_PATH, BASE_URL, BrowserWindowOptions};
