/**
 * All Page class must extends this abstract class
 * this is to avoid Page Class doesn't have expected method
 * such as render and afterRendeer method
 */
export default class BasePage {
  constructor() {
    if (this.constructor === BasePage) {
      throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
    }
  }

  static async render() {
    throw new TypeError('Abstract method, cannot be access directly.');
  }

  static async afterRender() {
    throw new TypeError('Abstract method, cannot be access directly.');
  }
}
