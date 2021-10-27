import BasePage from './base-page';

class RestaurantPage extends BasePage {
  static async render() {
    this.restoListView = (await import('../views/resto-list-view')).default;

    await import('../components/HeroElement/hero-element');
    return `
      <hero-element></hero-element>
      <section id="content">
        ${this.restoListView.getTemplate()}
      </section>
    `;
  }

  static async afterRender() {
    const RestoListPresenter = (await import('../presenters/resto-list-presenter')).default;
    const RestaurantApi = (await import('../data/api/restaurant-api')).default;
    this.restoListPresenter = new RestoListPresenter({
      view: this.restoListView,
      restaurantApi: RestaurantApi,
    });
    this.restoListPresenter.showAllRestaurants();

    this.addSearchFunctionality();
  }

  static addSearchFunctionality() {
    const heroElement = document.querySelector('hero-element');
    let delay;
    heroElement.onSearchInput = async (event) => {
      if (delay) clearTimeout(delay);
      const searchValue = event.target.value.trim();
      if (searchValue === '') {
        this.restoListPresenter.showAllRestaurants();
      } else {
        delay = setTimeout(async () => {
          this.restoListPresenter.showSearchedRestaurants(searchValue);
        }, 500);
      }
    };
  }
}

export default RestaurantPage;
