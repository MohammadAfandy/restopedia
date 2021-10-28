import { BaseElement, html } from '../base-element';
import UrlParser from '../../utils/url-parser';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

import '../Star-Rating/star-rating';

import styles from './resto-item.module.css';

export default class RestoItem extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.card);
    this.restaurant = {};
  }

  static get properties() {
    return {
      restaurant: { type: Object },
      isLoading: { type: Boolean },
    };
  }

  render() {
    const renderSkeleton = () => html`
      <div class="${styles.imageContainer}">
        <skeleton-element .height=${'250px'}></skeleton-element>
      </div>
      <div class="${styles.body}">
        <div class="${styles.subBody}">
          <skeleton-element .width=${'150px'} .height=${'25px'}></skeleton-element>
          <skeleton-element .width=${'100px'} .height=${'25px'}></skeleton-element>
        </div>
        <h2 class="${styles.title}">
          <skeleton-element .height=${'44px'} .width=${'200px'}></skeleton-element>
        </h2>
          <skeleton-element .height=${'75px'}></skeleton-element>
      </div>
    `;

    if (this.isLoading) return renderSkeleton();

    const {
      id,
      name,
      picture,
      city,
      rating,
      description,
    } = this.restaurant;

    return html`
      <div class="${styles.imageContainer}">
        <img
          class="${styles.image} lazyload"
          data-src="${picture && picture.small}"
          alt="Restaurant ${name}"
          @error=${this.onErrorImage}
        />
      </div>
      <div class="${styles.body}">
        <div class="${styles.subBody}">
          <div class="${styles.city}">
            <i class="fa fa-map-marker fa-lg" aria-hidden="true"></i>
            <span>${city}</span>
          </div>
          ${rating != null
            ? html`
              <star-rating
                .rating=${rating}
                .maxRating=${5}
                .totalStar=${5}
                ?showRating=${true}
              ></star-rating>
            `
            : ''}
        </div>
        <h2 class="${styles.title}">
          <a href="/#/restaurants/${UrlParser.slugify(name)}-${id}">${name}</a>
        </h2>
        <p class="${styles.description}">${description}</p>
      </div>
    `;
  }
}

customElements.define('resto-item', RestoItem);
