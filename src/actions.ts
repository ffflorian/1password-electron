import {ipcMain} from 'electron';

import {ACTION} from './static';
import {getFocusedWindow} from './utils';

const querySelectorUsername =
  '#item-details .section-username-password .field.string .value.string .value-container button';
const querySelectorPassword = '.section-username-password .field.concealed .value.concealed .value-container button';
const clickButton = (querySelector: string) => `
  if (b) {
    b.style['background-color']='#ffffff';
    b.style.visibility='hidden';
  }
  var b=document.querySelectorAll('${querySelector}')[0];
  if (b) {
    b.style['background-color']='#51f000';
    b.style.visibility='visible';
    b.click();
  }`;

export function registerActions(): void {
  ipcMain.on(ACTION.COPY_PASSWORD, async () => {
    const mainWindow = getFocusedWindow();
    if (mainWindow) {
      await mainWindow.webContents.executeJavaScript(clickButton(querySelectorPassword));
    } else {
      console.log('No main window found when copying password.');
    }
  });

  ipcMain.on(ACTION.COPY_USERNAME, async () => {
    const mainWindow = getFocusedWindow();
    if (mainWindow) {
      await mainWindow.webContents.executeJavaScript(clickButton(querySelectorUsername));
    } else {
      console.log('No main window found when copying username.');
    }
  });

  ipcMain.on(ACTION.SHOW_DEVTOOLS, () => {
    const mainWindow = getFocusedWindow();
    if (mainWindow) {
      mainWindow.webContents.openDevTools({mode: 'detach'});
    }
  });
}
