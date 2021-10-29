import { unsafeHTML } from 'lit/directives/unsafe-html';
import { until } from 'lit-html/directives/until';
import { BaseElement, html } from '../base-element';
import RestoReviewView from '../../views/resto-review-view';
import '../TabElement/tab-element';
import '../MenuPanel/menu-panel';
import '../StarRating/star-rating';

import styles from './resto-detail.module.css';

export default class RestoDetail extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.restoDetail);
    this.restaurant = null;
    this.errorText = '';
  }

  static get properties() {
    return {
      restaurant: { type: Object },
      errorText: { type: String },
    };
  }

  renderLoading() {
    return html`
      <div class="${styles.container}">
        <div class="${styles.detail}">
          <skeleton-element .height=${'360px'}></skeleton-element>
          <div class="${styles.subtitle}">
            <skeleton-element .height=${'2rem'} .width=${'200px'}></skeleton-element>
          </div>
          <div class="${styles.address}">
            <skeleton-element .width=${'150px'}></skeleton-element>
          </div>
            <skeleton-element .height=${'300px'}></skeleton-element>
        </div>
        <tab-element
          .isLoading=${true}
        ></tab-element>
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
    const {
      name,
      picture,
      city,
      address,
      rating,
      description,
      categoriesName,
      menus,
    } = this.restaurant;

    const tabs = [
      {
        name: 'Review',
        isActive: true,
        content: html`${until(
          RestoReviewView.getTemplate().then(unsafeHTML),
          '',
        )}`,
      },
      {
        name: 'Menu',
        isActive: false,
        content: html`<menu-panel .menus=${menus}></menu-panel>`,
      },
    ];

    return html`
      <div class="${styles.container}">
        <div class="${styles.detail}">
          <picture>
            <source media="(min-width: 1024px)" srcset="${picture && picture.large}">
            <source media="(min-width: 480px)" srcset="${picture && picture.medium}">
            <img
              class="${styles.image}"
              src="${picture && picture.small}"
              alt="Restaurant ${name}"
            >
          </picture>
          <div class="${styles.subtitle}">
            <div>
              <h3>${name}</h3>
              <div class="${styles.category}">
                ${categoriesName && categoriesName.map((category) => html`
                  <span>${category}</span>
                `)}
              </div>
            </div>
            ${rating && html`
              <star-rating
                .rating=${rating}
                .maxRating=${5}
                .totalStar=${5}
                .showRating=${true}
              ></star-rating>
            `}
          </div>
          <div class="${styles.address}">
            <h4>${address}, ${city}</h4>
          </div>
          <div class="${styles.description}">
            <h4>About ${name}</h4>
            <p>${description}</p>
          </div>
        </div>
        <tab-element
          .tabs=${tabs}
        ></tab-element>
      </div>
    `;
  }

  render() {
    if (this.errorText !== '') return this.renderError();
    if (this.restaurant) return this.renderSuccess();
    return this.renderLoading();
  }
}

customElements.define('resto-detail', RestoDetail);
