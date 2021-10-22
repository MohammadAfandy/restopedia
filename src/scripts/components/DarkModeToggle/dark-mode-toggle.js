import { BaseElement, html } from '../base-element';
import DarkModeHelper from '../../utils/dark-mode-helper';

import styles from './dark-mode-toggle.module.css';

export default class DarkModeToggle extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.darkModeToggle);
    this.isDark = DarkModeHelper.getMode() === 'dark';
  }

  static get properties() {
    return {
      isDark: { type: Boolean },
    };
  }

  onToggleDarkMode() {
    this.isDark = !this.isDark;
    if (this.isDark) {
      DarkModeHelper.setDarkMode();
    } else {
      DarkModeHelper.setLightMode();
    }
  }

  render() {
    return html`
      <div class="${styles.icon}" role="img">🌙</div>
      <label class="${styles.switch}">
        <input
          type="checkbox"
          ?checked=${this.isDark}
          @click=${this.onToggleDarkMode}
          aria-label="Toggle dark Mode"
        >
        <span class="${styles.slider}"></span>
      </label>
    `;
  }
}

customElements.define('dark-mode-toggle', DarkModeToggle);
