import { BaseElement, html } from '../base-element';

import styles from './star-rating.module.css';

export default class StarRating extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.starRating);

    this.rating = 0;
    this.maxRating = 5;
    this.totalStar = 5;
    this.showRating = false;
  }

  static get properties() {
    return {
      rating: { type: Number },
      maxRating: { type: Number },
      totalStar: { type: Number },
      showRating: { type: Boolean },
    };
  }

  render() {
    this.setAttribute('title', this.rating.toFixed(1));

    const starCountPerOneRating = this.totalStar / this.maxRating;
    const newRating = this.rating * starCountPerOneRating;

    const fullStarCount = Math.floor(newRating);
    const halfStarCount = Math.round(newRating - fullStarCount);
    const emptyStarCount = Math.round(this.totalStar - (fullStarCount + halfStarCount));

    const renderStar = (className) => html`
      <i
        class="fa ${className} ${styles.star}"
        aria-hidden="true"
      ></i>
    `;

    return html`
      ${[...Array(fullStarCount)].map(() => renderStar('fa fa-star'))}
      ${[...Array(halfStarCount)].map(() => renderStar('fa fa-star-half-o'))}
      ${[...Array(emptyStarCount)].map(() => renderStar('fa fa-star-o'))}

      ${this.showRating ? html`
        <span class="${styles.big}">${this.rating.toFixed(1)}</span>
        <span class="${styles.small}">/${this.maxRating}</span> 
      ` : ''}
    `;
  }
}

customElements.define('star-rating', StarRating);
