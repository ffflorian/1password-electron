import {app, BrowserWindow} from 'electron';

const platform = {
  IS_LINUX: process.platform === 'linux',
  IS_MAC_OS: process.platform === 'darwin',
  IS_WINDOWS: process.platform === 'win32',
};

const BASE_URL = 'https://my.1password.com';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    height: 600,
    width: 800,
  });

  mainWindow.on('closed', () => (mainWindow = null));

  mainWindow.loadURL(BASE_URL);
}

app.on('ready', () => createWindow());

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

if (platform.IS_LINUX) {
  app.disableHardwareAcceleration();
}
