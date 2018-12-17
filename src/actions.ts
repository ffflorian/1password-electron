import {ipcMain} from 'electron';

import {ACTION} from './Action';
import {getFocusedWindow} from './utils';

export function registerActions(): void {
  ipcMain.on(ACTION.SHOW_DEVTOOLS, () => {
    const mainWindow = getFocusedWindow();
    if (mainWindow) {
      mainWindow.webContents.openDevTools({mode: 'detach'});
    }
  });
}
