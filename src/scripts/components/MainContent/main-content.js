import { unsafeHTML } from 'lit/directives/unsafe-html';
import { BaseElement, html } from '../base-element';

import styles from './main-content.module.css';

export default class MainContent extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.mainContent);
    this.id = 'main_content';
    this.setAttribute('role', 'main');
    this.content = '';
  }

  static get properties() {
    return {
      content: { type: String },
    };
  }

  /**
   * when set content
   * we have to wait for updateComplete lifecycle to finish first
   * otherwise we could get dom not found when selecting DOM object
   */
  async setContent(content) {
    this.content = content;
    await this.updateComplete;
  }

  render() {
    return html`${unsafeHTML(this.content)}`;
  }
}

customElements.define('main-content', MainContent);
