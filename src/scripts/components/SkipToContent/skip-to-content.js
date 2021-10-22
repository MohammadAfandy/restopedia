import { BaseElement } from '../base-element';

import styles from './skip-to-content.module.css';

export default class SkipToContent extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.skipToContent);
    this.setAttribute('role', 'button');
    this.tabIndex = 0;
    this.textContent = 'Skip to content';

    // we cannot use default behavior of scrollintohash because of our custom routing url
    this.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        document.querySelector('#content').scrollIntoView({
          behavior: 'smooth',
        });
      }
    });
  }
}

customElements.define('skip-to-content', SkipToContent);
