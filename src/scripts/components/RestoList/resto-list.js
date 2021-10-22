import { BaseElement, html } from '../base-element';
import '../RestoItem/resto-item';

import styles from './resto-list.module.css';

export default class RestoList extends BaseElement {
  constructor() {
    super();
    this.setAttribute('role', 'article');
    this.classList.add(styles.restoList);
    this.restaurants = [];
    this.isLoading = false;
  }

  static get properties() {
    return {
      restaurants: { type: Array },
      isLoading: { type: Boolean },
    };
  }

  render() {
    let restoItems = this.restaurants.map((restaurant) => html`
      <resto-item .restaurant=${restaurant}></resto-item>
    `);

    if (this.isLoading) {
      restoItems = [...Array(3)].map(() => html`
        <resto-item .isLoading=${true}></resto-item>
      `);
    }

    return html`
      <div class="${styles.wrapper}">
        ${restoItems}
      </div>
    `;
  }
}

customElements.define('resto-list', RestoList);
