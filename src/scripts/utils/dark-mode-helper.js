import LocalStorageHelper from './local-storage-helper';

class DarkModeHelper {
  static init() {
    if (this.getMode() === 'dark') {
      this.setDarkMode();
    } else {
      this.setLightMode();
    }
  }

  static getMode() {
    // first check theme on local storage
    const theme = LocalStorageHelper.get('theme');
    if (theme) return theme;

    // if no theme set on local storage yet then check on OS level
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDarkScheme.matches ? 'dark' : 'light';
  }

  static setDarkMode() {
    document.body.setAttribute('data-theme', 'dark');
    LocalStorageHelper.set('theme', 'dark');
  }

  static setLightMode() {
    document.body.removeAttribute('data-theme', 'dark');
    LocalStorageHelper.set('theme', 'light');
  }
}

export default DarkModeHelper;
