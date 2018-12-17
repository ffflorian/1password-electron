import {ipcRenderer} from 'electron';

import {ACTION} from './Action';

function isReady(cb: () => void): void {
  if (document.readyState !== 'loading') {
    cb();
  } else {
    document.addEventListener('DOMContentLoaded', cb);
  }
}

const querySelectorUsername =
  '#item-details .section-username-password .field.string .value.string .value-container button';
const querySelectorPassword = '.section-username-password .field.concealed .value.concealed .value-container button';

const clickButton = (querySelector: string) => {
  const randomVar = Math.random()
    .toString(36)
    .substring(7);

  window.pButton[randomVar] = document.querySelectorAll<HTMLButtonElement>(querySelector)[0];
  if (window.pButton[randomVar]) {
    const originalStyle = window.pButton[randomVar].style.cssText;
    window.pButton[randomVar].style.backgroundColor = '#51f000';
    window.pButton[randomVar].style.opacity = '1';
    window.pButton[randomVar].style.visibility = 'visible';
    window.pButton[randomVar].style.transition = 'opacity 1s linear';
    window.pButton[randomVar].style.opacity = '0';
    window.pButton[randomVar].click();

    setTimeout(() => {
      window.pButton[randomVar].style.opacity = '1';
      window.pButton[randomVar].style.cssText = originalStyle;
    }, 1000);
  }
};

isReady(() => {
  ipcRenderer.on(ACTION.COPY_PASSWORD, () => clickButton(querySelectorPassword));
  ipcRenderer.on(ACTION.COPY_USERNAME, () => clickButton(querySelectorUsername));
});
