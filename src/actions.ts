import {ipcMain} from 'electron';

import {ACTION} from './Action';
import {getFocusedWindow} from './utils';

const querySelectorUsername =
  '#item-details .section-username-password .field.string .value.string .value-container button';
const querySelectorPassword = '.section-username-password .field.concealed .value.concealed .value-container button';
const clickButton = (querySelector: string) => {
  const randomVar = Math.random()
    .toString(36)
    .substring(7);
  return `const ${randomVar} = document.querySelectorAll('${querySelector}')[0];
  if (${randomVar}) {
    const originalStyle = {...${randomVar}.style};
    ${randomVar}.style.backgroundColor = '#51f000';
    ${randomVar}.style.opacity = '1';
    ${randomVar}.style.visibility = 'visible';
    ${randomVar}.style.transition = 'opacity 1s linear';
    ${randomVar}.style.opacity = '0';
    ${randomVar}.click();
    setTimeout(() => {
      ${randomVar}.style.opacity = '1';
      ${randomVar}.style = originalStyle;
    }, 1000);
  }`;
};

export function registerActions(): void {
  ipcMain.on(ACTION.COPY_PASSWORD, async () => {
    const mainWindow = getFocusedWindow();
    if (mainWindow) {
      await mainWindow.webContents.executeJavaScript(clickButton(querySelectorPassword));
    } else {
      console.log('No main window found when trying to copy the password.');
    }
  });

  ipcMain.on(ACTION.COPY_USERNAME, async () => {
    const mainWindow = getFocusedWindow();
    if (mainWindow) {
      await mainWindow.webContents.executeJavaScript(clickButton(querySelectorUsername));
    } else {
      console.log('No main window found when trying to copy the username.');
    }
  });

  ipcMain.on(ACTION.SHOW_DEVTOOLS, () => {
    const mainWindow = getFocusedWindow();
    if (mainWindow) {
      mainWindow.webContents.openDevTools({mode: 'detach'});
    }
  });
}
