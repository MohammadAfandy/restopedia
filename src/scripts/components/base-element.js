import { LitElement } from 'lit-element/lit-element';

/**
 * All custom element should extend this abstract class
 * I prefer not to use ShadowDOM
 * and to handle css scope, we can use css module from webpack
 */
export class BaseElement extends LitElement {
  constructor() {
    super();
    if (this.constructor === BaseElement) {
      throw new TypeError(`Abstract class "${this.constructor.name}" cannot be instantiated directly.`);
    }
  }

  // https://stackoverflow.com/questions/55126694/how-to-create-litelement-without-shadow-dom
  createRenderRoot() {
    return this;
  }
}

/**
 * export all named export from litelement module
 * so we don't have to import from litelement module again
 */
export * from 'lit-element/lit-element';
