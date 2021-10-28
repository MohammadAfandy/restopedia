import { BaseElement, html } from '../base-element';
import LogoImage from '../../../public/images/logo.png';
import CONFIG from '../../globals/config';
import '../NavBar/nav-bar';

import styles from './app-bar.module.css';

export default class AppBar extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.appBar);
    this.logo = LogoImage;
    this.title = CONFIG.APP_NAME;
    this.isDrawerOpen = false;
    this.currentUrl = '/';

    this.addOutsideEventListener();
  }

  static get properties() {
    return {
      logo: { type: String },
      title: { type: String },
      isDrawerOpen: { type: Boolean },
      currentUrl: { type: String },
    };
  }

  addOutsideEventListener() {
    document.querySelector('body').addEventListener('click', (event) => {
      if (event.target.closest('nav-bar') == null) {
        if (this.isDrawerOpen) this.onToggleDrawer(event);
      }
      event.stopPropagation();
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        if (this.isDrawerOpen) this.onToggleDrawer(event);
      }
    });
  }

  onToggleDrawer(event) {
    event.stopPropagation();

    // ignore if hamburger button is hidden / in desktop mode
    if (window.getComputedStyle(this.querySelector('#hamburger')).display === 'none') {
      return;
    }

    this.isDrawerOpen = !this.isDrawerOpen;

    // prevent scrollable body when drawer is open
    let bodyOverflow = null;
    if (this.isDrawerOpen) {
      bodyOverflow = 'hidden';
    }
    document.querySelector('body').style.overflow = bodyOverflow;
  }

  render() {
    return html`
      <img
        class="${styles.logo}"
        src="${this.logo}"
        alt="Logo ${this.title}"
        height="40"
        width="40"
      />
      <h1 class="${styles.title}">
        <a href="#/">${this.title}</a>
      </h1>
      <button
        aria-label="Open Navigation Drawer"
        id="hamburger"
        class="${styles.hamburger}"
        @click=${this.onToggleDrawer}
      >
        ☰
      </button>
      <nav-bar
        .onToggleDrawer=${this.onToggleDrawer.bind(this)}
        ?isDrawerOpen=${this.isDrawerOpen}
        .currentUrl=${this.currentUrl}
      ></nav-bar>
    `;
  }
}

customElements.define('app-bar', AppBar);
