import { BaseElement, html } from '../base-element';

import styles from './search-input.module.css';

export default class SearchInput extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.searchInput);
    this.value = '';
    this.placeholder = '';
  }

  static get properties() {
    return {
      value: { this: String },
      placeholder: { type: String },
      onInput: { type: Function },
    };
  }

  render() {
    return html`
      <i class="fa fa-search ${styles.search}" aria-hidden="true"></i>
      <input
        class="${styles.input}"
        placeholder="${this.placeholder}"
        .value=${this.value}
        @input=${this.onInput}
      />
    `;
  }
}

customElements.define('search-input', SearchInput);
