import { BaseElement, html } from '../base-element';
import CONFIG from '../../globals/config';

import styles from './footer-element.module.css';

export default class FooterElement extends BaseElement {
  constructor() {
    super();
    this.appName = CONFIG.APP_NAME;
  }

  static get properties() {
    return {
      isLiked: { type: Boolean },
      onLike: { type: Function },
      ariaLabel: { type: String },
    };
  }

  onClickLike(event) {
    this.onLike();
    event.stopPropagation();
  }

  render() {
    return html`
      <div class="${styles.footer}">
        <span>&copy; ${new Date().getFullYear()} - ${this.appName}</span>
      </div>
    `;
  }
}

customElements.define('footer-element', FooterElement);
