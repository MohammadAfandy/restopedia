import { BaseElement, html } from '../base-element';
import '../SearchInput/search-input';

import styles from './hero-element.module.css';

export default class HeroElement extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.hero);
    this.title = 'Top 100 Best Restaurant App';
    this.subtitle = 'It\'s never so easy to get the best food in your area';
  }

  static get properties() {
    return {
      title: { type: String },
      subtitle: { type: String },
      onSearchInput: { type: Function },
    };
  }

  render() {
    return html`
      <div class="${styles.inner}">
        <div class="${styles.title}">${this.title}</div>
        <div class="${styles.subtitle}">${this.subtitle}</div>
        <search-input
          .placeholder=${'Search for restaurant, category, or menu'}
          .onInput=${this.onSearchInput}
        ></search-input>
      </div>
    `;
  }
}

customElements.define('hero-element', HeroElement);
