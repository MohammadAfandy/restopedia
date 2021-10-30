import { BaseElement, html } from '../base-element';

import styles from './menu-panel.module.css';

export default class MenuPanel extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.menuPanel);
    this.menus = [];
  }

  static get properties() {
    return {
      menus: { type: Array },
    };
  }

  render() {
    const { foods, drinks } = this.menus;
    return html`
      <fieldset class="${styles.fieldset}">
        <legend>Foods</legend>
        ${foods.map((food) => html`
          <span class="${styles.item} ${styles.food}">${food.name}</span>
        `)}
      </fieldset>
      <fieldset class="${styles.fieldset}">
        <legend>Drinks</legend>
        ${drinks.map((drink) => html`
          <span class="${styles.item} ${styles.drink}">${drink.name}</span>
        `)}
      </fieldset>
    `;
  }
}

customElements.define('menu-panel', MenuPanel);
