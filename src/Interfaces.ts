declare global {
  interface Window {
    pButton: {
      [randomVar: string]: HTMLButtonElement;
    };
  }
}

export {};
