import { ifDefined } from 'lit-html/directives/if-defined';
import { BaseElement, html } from '../base-element';

import styles from './nav-bar-item.module.css';

export default class NavBarItem extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.navBarItem);
    this.menu = null;
  }

  static get properties() {
    return {
      menu: { type: Object },
    };
  }

  render() {
    const {
      url,
      name,
      isActive,
      target,
    } = this.menu;

    return html`
      <a
        class="${isActive ? styles.active : ''}"
        href="${url}"
        target=${ifDefined(target ? '_blank' : undefined)}
        rel=${ifDefined(target === '_blank' ? 'noreferrer' : undefined)}
      >
        <span>${name}</span>
      </a>
    `;
  }
}

customElements.define('nav-bar-item', NavBarItem);
