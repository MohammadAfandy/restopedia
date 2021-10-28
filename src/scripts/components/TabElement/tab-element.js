import { BaseElement, html } from '../base-element';

import styles from './tab-element.module.css';

export default class TabElement extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.tabElement);
    this.tabs = [];
    this.isLoading = false;
  }

  static get properties() {
    return {
      tabs: { type: Array },
      isLoading: { type: Boolean },
    };
  }

  onClickTab(tabName) {
    this.tabs = this.tabs.map((tab) => ({
      ...tab,
      isActive: tab.name === tabName,
    }));
  }

  render() {
    const renderSkeleton = () => html`
      <div role="tablist">
        ${[...Array(2)].map(() => html`
          <div class="${styles.tab}">
            <skeleton-element .height=${'2rem'}></skeleton-element>
          </div>
        `)}
      </div>
      <div role="tabpanel" class="${styles.tabPanel}">
        <skeleton-element .height=${'400px'}></skeleton-element>
      </div>
    `;

    if (this.isLoading) return renderSkeleton();

    return html`
      <div role="tablist">
        ${this.tabs.map((tab) => html`
          <button
            class="${styles.tab} ${tab.isActive ? styles.active : ''}"
            role="tab"
            aria-selected="${tab.isActive}"
            aria-label="Tab ${tab.name}"
            @click=${() => this.onClickTab(tab.name)}
          >
            ${tab.name}
          </button>
        `)}
        </div>
        ${this.tabs.map((tab) => html`
          <div
            class="${styles.tabPanel} ${tab.isActive ? '' : styles.hidden}"
            id="panel-${tab.name}"
            role="tabpanel"
            aria-labelledby="tab-${tab.name}"
          >
            ${tab.content}
          </div>
        `)}
    `;
  }
}

customElements.define('tab-element', TabElement);
