import { ref, createRef } from 'lit/directives/ref';
import { createAvatar } from '@dicebear/avatars';
import { unsafeHTML } from 'lit-html/directives/unsafe-html';
import * as avatarStyle from '@dicebear/avatars-initials-sprites';
import { BaseElement, html } from '../base-element';
import SnackBarInitiator from '../../utils/snackbar-initiator';

import styles from './resto-review.module.css';

export default class RestoReview extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.restoReview);
    this.reviews = [];

    this.inputName = createRef();
    this.inputReview = createRef();
    this.buttonSubmit = createRef();
  }

  static get properties() {
    return {
      restaurantId: { type: String },
      reviews: { type: Array },
      postReview: { type: Function },
    };
  }

  async onSubmitReview(event) {
    event.preventDefault();

    const nameValue = this.inputName.value.value;
    const reviewValue = this.inputReview.value.value;
    const buttonSubmit = this.buttonSubmit.value;

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

    buttonSubmit.setAttribute('disabled', true);
    buttonSubmit.querySelector('.fa-paper-plane').style.display = 'none';
    buttonSubmit.querySelector('.fa-spinner').style.display = 'inline-block';
    const response = await this.postReview(reviewData);
    if (response.error === false) {
      this.inputName.value.value = '';
      this.inputReview.value.value = '';
    }
    buttonSubmit.removeAttribute('disabled');
    buttonSubmit.querySelector('.fa-paper-plane').style.display = 'inline-block';
    buttonSubmit.querySelector('.fa-spinner').style.display = 'none';
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

  generateAvatar(name) {
    return createAvatar(avatarStyle, {
      seed: name,
      radius: 50,
      size: 46,
    });
  }

  render() {
    return html`
      <ul>
        ${this.reviews.length
          ? this.reviews.map((review) => html`
            <li class="${styles.container} review_container" tabindex="0">
              <div class="${styles.profile}">
                ${unsafeHTML(this.generateAvatar(review.name))}
                <div class="${styles.desc}">
                  <span class="${styles.name} reviewer_name">${review.name}</span>
                  <span class="${styles.date} reviewer_date">${review.date}</span>
                </div>
              </div>
              <p class="${styles.review} reviewer_review">${review.review}</p>
            </li>
          `)
          : html`<li class="${styles.container} ${styles.center}">No reviews found</li>`
        }
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
          <i class="fas fa-spinner fa-spin" aria-hidden="true" style="display: none;"></i>
          <span>Send</span>
        </button>
      </form>
    `;
  }
}

if (customElements.get('resto-review') === undefined) customElements.define('resto-review', RestoReview);
