import { BaseElement, html } from '../base-element';

import styles from './error-element.module.css';

export default class ErrorElement extends BaseElement {
  constructor() {
    super();
    this.text = 'Oops... something went wrong';
  }

  static get properties() {
    return {
      text: { type: String },
    };
  }

  render() {
    return html`
      <div class=${styles.error}>
        <i class="fa fa-frown-o" aria-hidden="true"></i> ${this.text}
      </div>
    `;
  }
}

customElements.define('error-element', ErrorElement);
