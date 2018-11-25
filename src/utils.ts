import {BrowserWindow} from 'electron';

export const platform = {
  IS_LINUX: process.platform === 'linux',
  IS_MAC_OS: process.platform === 'darwin',
  IS_WINDOWS: process.platform === 'win32',
};

export const getFocusedWindow = () => BrowserWindow.getFocusedWindow();
