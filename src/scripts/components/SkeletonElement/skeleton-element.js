import { BaseElement } from '../base-element';

import styles from './skeleton-element.module.css';

export default class SkeletonElement extends BaseElement {
  constructor() {
    super();
    this.classList.add(styles.skeleton);
    this.height = '1rem';
    this.width = '100%';
  }

  static get properties() {
    return {
      height: { type: String },
      width: { type: String },
    };
  }

  render() {
    this.style.height = this.height;
    this.style.width = this.width;
  }
}

customElements.define('skeleton-element', SkeletonElement);
