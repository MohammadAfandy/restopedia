import { BaseElement, html } from '../base-element';
import '../NavBarItem/nav-bar-item';
import '../DarkModeToggle/dark-mode-toggle';

import styles from './nav-bar.module.css';

export default class NavBar extends BaseElement {
  constructor() {
    super();
    this.setAttribute('role', 'navigation');
    this.setAttribute('aria-label', 'Main');
    this.classList.add(styles.navBar);
    this.menus = [];
    this.isDrawerOpen = false;
    this.currentUrl = '';

    this.setInitialMenus();
  }

  static get properties() {
    return {
      menus: { type: Array },
      onToggleDrawer: { type: Function },
      isDrawerOpen: { type: Boolean },
      currentUrl: { type: String },
    };
  }

  setInitialMenus() {
    this.menus = [
      {
        url: '#/',
        name: 'Home',
        isActive: true,
      },
      {
        url: '#/favorites',
        name: 'Favorite',
        isActive: false,
      },
      {
        url: 'https://github.com/mohammadafandy',
        name: 'About Us',
        isActive: false,
        target: '_blank',
      },
    ];
  }

  setActiveMenu() {
    this.menus = this.menus.map((menu) => ({
      ...menu,
      isActive: menu.url === `#${this.currentUrl}`,
    }));
  }

  render() {
    if (this.isDrawerOpen) {
      this.classList.add(styles.open);
    } else {
      this.classList.remove(styles.open);
    }
    this.setActiveMenu();
    return html`
      <ul>
        ${this.menus.map((menu) => html`
          <li>
            <nav-bar-item
              .menu=${menu}
              @click=${this.onToggleDrawer}
            ></nav-bar-item>
          </li>
        `)}
        <li class="${styles.darkMode}">
          <dark-mode-toggle></dark-mode-toggle>
        </li>
      </ul>
    `;
  }
}

customElements.define('nav-bar', NavBar);
