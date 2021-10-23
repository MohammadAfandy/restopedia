import { BaseElement, html } from '../base-element';

import styles from './like-button.module.css';

export default class LikeButton extends BaseElement {
  constructor() {
    super();
    this.isLiked = false;
    this.ariaLabel = '';
  }

  static get properties() {
    return {
      isLiked: { type: Boolean },
      onLike: { type: Function },
      ariaLabel: { type: String },
    };
  }

  onClickLike(event) {
    this.onLike();
    event.stopPropagation();
  }

  render() {
    return html`
      <button class="${styles.likeButton}" aria-label="${this.ariaLabel}" @click=${this.onClickLike}>
        <i
          class="${this.isLiked ? 'fa fa-heart' : 'fa fa-heart-o'}"
          aria-hidden="true"
        ></i>
      </button>
    `;
  }
}

customElements.define('like-button', LikeButton);
