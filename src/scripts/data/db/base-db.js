import { openDB } from 'idb';
import CONFIG from '../../globals/config';

const {
  DATABASE_NAME,
  DATABASE_VERSION,
} = CONFIG;

class BaseDB {
  /**
   * unfortunately we cannot use static property
   * I think it's because @babel/preset-env does not support it yet
   * so to handle it, we pass static property in init function
   * @see https://stackoverflow.com/questions/40367392/static-class-property-not-working-with-babel
   */
  // static objectStoreName = null;

  static init({
    objectStoreName,
    ...options
  }) {
    this.objectStoreName = objectStoreName;
    this.dbPromise = openDB(DATABASE_NAME, DATABASE_VERSION, {
      upgrade(database) {
        database.createObjectStore(objectStoreName, options);
      },
    });
  }

  static async getAll() {
    return (await this.dbPromise).getAll(this.objectStoreName);
  }

  static async get(id) {
    if (!id) return null;
    return (await this.dbPromise).get(this.objectStoreName, id);
  }

  static async put(data) {
    return (await this.dbPromise).put(this.objectStoreName, data);
  }

  static async delete(id) {
    return (await this.dbPromise).delete(this.objectStoreName, id);
  }

  static async isExist(id) {
    return !!(await this.get(id));
  }
}

export default BaseDB;
