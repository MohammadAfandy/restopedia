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
    this.errorText = '';
  }

  static get properties() {
    return {
      restaurants: { type: Array },
      isLoading: { type: Boolean },
      errorText: { type: String },
    };
  }

  renderLoading() {
    return html`
      <div class="${styles.wrapper}">
        ${[...Array(6)].map(() => html`
          <resto-item .isLoading=${true}></resto-item>
        `)}
      </div>
    `;
  }

  renderError() {
    import('../ErrorElement/error-element');
    return html`
      <error-element .text=${this.errorText}></error-element>
    `;
  }

  renderSuccess() {
    return html`
      <div class="${styles.wrapper}">
        ${this.restaurants.map((restaurant) => html`
          <resto-item .restaurant=${restaurant}></resto-item>
        `)}
      </div>
    `;
  }

  render() {
    if (this.isLoading) return this.renderLoading();
    if (this.errorText !== '') return this.renderError();
    return this.renderSuccess();
  }
}

customElements.define('resto-list', RestoList);
