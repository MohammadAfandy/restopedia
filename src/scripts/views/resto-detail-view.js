export default class RestoDetailView {
  static async getTemplate() {
    await import('../components/RestoDetail/resto-detail');
    return `
      <div id="resto_detail_container">
        <h2 id="resto_detail_title" class="main-title"></h2>
        <resto-detail></resto-detail>
      </div>
    `;
  }

  static setTitle(title = '') {
    const restoListTitleElement = document.querySelector('#resto_detail_title');
    restoListTitleElement.textContent = title;
  }

  static renderRestaurant(restaurant) {
    const restoDetailElement = document.querySelector('resto-detail');
    restoDetailElement.errorText = '';
    restoDetailElement.restaurant = restaurant;
  }

  static renderError(text) {
    const restoDetailElement = document.querySelector('resto-detail');
    restoDetailElement.errorText = text;
  }

  static emptyRestaurant() {
    const restoDetailElement = document.querySelector('resto-detail');
    restoDetailElement.restaurant = null;
  }
}
