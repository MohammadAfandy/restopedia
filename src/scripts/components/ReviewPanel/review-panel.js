import { ref, createRef } from 'lit/directives/ref';
import { BaseElement, html } from '../base-element';
import SnackBarInitiator from '../../utils/snackbar-initiator';
import RestaurantApi from '../../data/api/restaurant-api';

import styles from './review-panel.module.css';

export default class ReviewPanel extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.reviewPanel);
    this.reviews = [];

    this.inputName = createRef();
    this.inputReview = createRef();
    this.buttonSubmit = createRef();
  }

  static get properties() {
    return {
      restaurantId: { type: String },
      reviews: { type: Array },
      onAfterAddReview: { type: Function },
    };
  }

  async onSubmitReview(event) {
    event.preventDefault();

    const nameValue = this.inputName.value.value;
    const reviewValue = this.inputReview.value.value;

    if (nameValue.trim() === '') {
      SnackBarInitiator.show({
        text: 'Name is required',
        type: 'failed',
      });
      return;
    }

    if (reviewValue.trim() === '') {
      SnackBarInitiator.show({
        text: 'Review is required',
        type: 'failed',
      });
      return;
    }

    const reviewData = {
      id: this.restaurantId,
      name: nameValue,
      review: reviewValue,
    };
    this.buttonSubmit.value.setAttribute('disabled', true);
    const response = await RestaurantApi.addReview(reviewData);

    if (response.error === false) {
      this.inputName.value.value = '';
      this.inputReview.value.value = '';

      SnackBarInitiator.show({
        text: 'Your review has been added',
      });

      this.onAfterAddReview();
    } else {
      SnackBarInitiator.show({
        text: response.message,
        type: 'failed',
      });
    }
    this.buttonSubmit.value.removeAttribute('disabled');
  }

  onFocusTextArea() {
    this.inputReview.value.classList.add(styles.large);
  }

  onBlurTextArea() {
    const inputReview = this.inputReview.value;
    if (inputReview.value === '') {
      inputReview.classList.remove(styles.large);
    }
  }

  render() {
    return html`
      <ul>
        ${this.reviews.map((review) => html`
          <li class="${styles.container}" tabindex="0">
            <div class="${styles.profile}">
              <img
                class="${styles.avatar}"
                src="https://avatar.oxro.io/avatar.svg?name=${review.name}"
                alt="${review.name}"
              >
              <div class="${styles.desc}">
                <span class="${styles.name}">${review.name}</span>
                <span class="${styles.date}">${review.date}</span>
              </div>
            </div>
            <p class="${styles.review}">${review.review}</p>
        `)}
      </ul>
      <form class="${styles.addReview}" @submit=${this.onSubmitReview}>
        <div class="${styles.formTitle}">Leave your review here ...</div>
        <label class="${styles.label}" for="review_name">
          <input
            class="${styles.input} ${styles.inputName}"
            type="text"
            placeholder="Name"
            id="review_name"
            ${ref(this.inputName)}
          >
          <span>Name</span>
        </label>
        <label class="${styles.label}" for="review_text">
          <textarea
            class="${styles.input} ${styles.inputReview}"
            placeholder="Review"
            id="review_text"
            @focus=${this.onFocusTextArea}
            @blur=${this.onBlurTextArea}
            ${ref(this.inputReview)}
          ></textarea>
          <span>Review</span>
        </label>
        <button type="submit" class="${styles.button}" ${ref(this.buttonSubmit)}>
          <i class="fa fa-paper-plane" aria-hidden="true"></i>
          Send
        </button>
      </form>
    `;
  }
}

customElements.define('review-panel', ReviewPanel);
