export default class RestoListView {
  static async getTemplate() {
    await import('../components/RestoList/resto-list');
    return `
      <h2 id="resto_list_title" class="main-title"></h2>
      <resto-list></resto-list>
    `;
  }

  static setTitle(title = '') {
    const restoListTitleElement = document.querySelector('#resto_list_title');
    restoListTitleElement.textContent = title;
  }

  static renderRestaurants(restaurants = []) {
    const restoListElement = document.querySelector('resto-list');
    restoListElement.errorText = '';
    restoListElement.restaurants = restaurants;
  }

  static renderError(text) {
    const restoListElement = document.querySelector('resto-list');
    restoListElement.errorText = text;
  }

  static emptyRestaurants() {
    const restoListElement = document.querySelector('resto-list');
    restoListElement.errorText = '';
    restoListElement.restaurants = [];
  }
}
