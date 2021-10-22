import { BaseElement, html } from '../base-element';
import '../TabElement/tab-element';
import '../MenuPanel/menu-panel';
import '../ReviewPanel/review-panel';
import '../Star-Rating/star-rating';

import styles from './resto-detail.module.css';

export default class RestoDetail extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.restoDetail);
    this.restaurant = null;
    this.isLoading = false;
  }

  static get properties() {
    return {
      restaurant: { type: Object },
      onAfterAddReview: { type: Function },
      isLoading: { type: Boolean },
    };
  }

  render() {
    const renderSkeleton = () => html`
      <h2 class="${styles.title}">Detail Restaurant</h2>
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

    if (this.isLoading) return renderSkeleton();
    if (!this.restaurant) return html``;

    const {
      id,
      name,
      picture,
      city,
      address,
      rating,
      description,
      categoriesName,
      menus,
      customerReviews,
    } = this.restaurant;

    const tabs = [
      {
        name: 'Review',
        isActive: true,
        content: html`
          <review-panel
            .restaurantId=${id}
            .reviews=${customerReviews || []}
            .onAfterAddReview=${this.onAfterAddReview && this.onAfterAddReview.bind(this)}
          ></review-panel>`,
      },
      {
        name: 'Menu',
        isActive: false,
        content: html`<menu-panel .menus=${menus}></menu-panel>`,
      },
    ];

    return html`
      <h2 class="${styles.title}">Detail Restaurant</h2>
      <div class="${styles.container}">
        <div class="${styles.detail}">
          <img class="${styles.image}" alt="Restaurant ${name}" src="${picture && picture.large}">
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
}

customElements.define('resto-detail', RestoDetail);
