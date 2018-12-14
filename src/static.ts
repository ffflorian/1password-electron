import {BrowserWindowConstructorOptions, app} from 'electron';
import * as path from 'path';

const APP_PATH = app.getAppPath();
const BASE_URL = 'https://my.1password.com';
const ICON_PATH = path.join(APP_PATH, 'resources', 'icon@128x128.png');
const PRELOAD_JS = path.join(APP_PATH, 'dist', 'preload.js');

const BrowserWindowOptions: BrowserWindowConstructorOptions = {
  autoHideMenuBar: false,
  fullscreen: false,
  height: 850,
  icon: ICON_PATH,
  title: '1Password',
  webPreferences: {
    nodeIntegration: false,
    nodeIntegrationInWorker: false,
    preload: PRELOAD_JS,
  },
  width: 1200,
};

export {APP_PATH, BASE_URL, BrowserWindowOptions};
