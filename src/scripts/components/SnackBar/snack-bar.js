import { BaseElement, html } from '../base-element';

import styles from './snack-bar.module.css';

export default class SnackBar extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.snackBar);
    this.setAttribute('role', 'alert');

    this.timer = null;
  }

  static get properties() {
    return {
      isShowed: { type: Boolean },
      duration: { type: Number },
      text: { type: String },
      type: { type: String },
    };
  }

  show({
    text,
    duration = 5000,
    type = 'success',
  }) {
    if (this.isShowed) {
      clearTimeout(this.timer);
    }
    this.isShowed = true;
    this.text = text;
    this.duration = duration;
    this.type = type;

    this.timer = setTimeout(() => this.hide(), this.duration);
  }

  hide() {
    this.isShowed = false;
  }

  render() {
    if (this.isShowed) {
      this.classList.add(styles.shown);
    } else {
      this.classList.remove(styles.shown);
    }

    if (this.type === 'success') {
      this.classList.add(styles.success);
      this.classList.remove(styles.failed);
    } else {
      this.classList.add(styles.failed);
      this.classList.remove(styles.success);
    }

    return html`
      <span>${this.text}</span>
      <i
        class="${styles.close}"
        data-dismiss="alert"
        aria-label="close alert"
        @click=${this.hide}
      >&times;</i>
    `;
  }
}

if (customElements.get('snack-bar') === undefined) customElements.define('snack-bar', SnackBar);
