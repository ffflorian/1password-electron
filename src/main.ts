import {BrowserWindow, app} from 'electron';
import {BASE_URL, BrowserWindowOptions} from './static';
import {platform} from './utils';

let mainWindow: BrowserWindow | null = null;

const devtools = process.argv[2] === '--devtools';

const createWindow = () => {
  mainWindow = new BrowserWindow(BrowserWindowOptions);

  mainWindow.on('closed', () => (mainWindow = null));

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
  .on('ready', () => createWindow())
  .on('window-all-closed', () => app.quit());

if (platform.IS_LINUX) {
  app.disableHardwareAcceleration();
}
