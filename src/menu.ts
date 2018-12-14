import {Menu, MenuItemConstructorOptions, app, globalShortcut, ipcMain} from 'electron';
import {ACTION} from './Action';

const fileMenu: MenuItemConstructorOptions = {
  label: '&File',
  submenu: [
    {
      accelerator: 'Ctrl+Q',
      click: () => app.quit(),
      label: '&Exit',
    },
  ],
};

const editMenu: MenuItemConstructorOptions = {
  label: '&Edit',
  submenu: [
    {
      accelerator: 'CmdOrCtrl+B',
      click: () => ipcMain.emit(ACTION.COPY_USERNAME),
      label: 'Copy &username',
    },
    {
      accelerator: 'CmdOrCtrl+C',
      click: () => ipcMain.emit(ACTION.COPY_PASSWORD),
      label: 'Copy &password',
    },
  ],
};

const developerMenu: MenuItemConstructorOptions = {
  label: '&Developer',
  submenu: [
    {
      accelerator: 'CmdOrCtrl+Shift+I',
      click: () => {
        ipcMain.emit(ACTION.SHOW_DEVTOOLS);
      },
      label: '&Open DevTools',
    },
  ],
};

export const menu: Menu = Menu.buildFromTemplate([fileMenu, editMenu, developerMenu]);

export function registerShortcuts(): void {
  globalShortcut.register('CmdOrCtrl+C', () => ipcMain.emit(ACTION.COPY_PASSWORD));
}

export const unregisterShortcuts = () => globalShortcut.unregisterAll();
