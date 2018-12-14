import {ipcRenderer} from 'electron';

import {ACTION} from './Action';

const language = document.getElementsByTagName('html')[0].lang;
ipcRenderer.send(ACTION.SET_LANGUAGE, language);
