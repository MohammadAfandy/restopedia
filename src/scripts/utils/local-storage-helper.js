class LocalStorageHelper {
  static isStorageExist() {
    if (typeof Storage === 'undefined') {
      console.warn('Browser does not support local storage');
      return false;
    }
    return true;
  }

  static set(key, value) {
    return this.isStorageExist() && localStorage.setItem(key, value);
  }

  static get(key) {
    return this.isStorageExist() && localStorage.getItem(key);
  }

  static remove(key) {
    return this.isStorageExist() && localStorage.removeItem(key);
  }
}

export default LocalStorageHelper;
