import BasePage from './base-page';
import RestaurantApi from '../../data/api/restaurant-api';
import BaseHelper from '../../utils/base-helper';

class RestaurantPage extends BasePage {
  static async render() {
    await import('../../components/HeroElement/hero-element');
    await import('../../components/RestoList/resto-list');
    return `
      <hero-element></hero-element>
      <h2 class="main-title"></h2>
      <section id="content">
        <resto-list></resto-list>
        <div id="error_content"></div>
      </section>
    `;
  }

  static async afterRender() {
    this.emptyElement = document.querySelector('#error_content');
    this.renderAllRestaurants();

    // for search event in hero element
    const heroElement = document.querySelector('hero-element');
    let delay;
    heroElement.onSearchInput = async (event) => {
      if (delay) clearTimeout(delay);
      const searchValue = event.target.value.trim();
      if (searchValue === '') {
        this.renderAllRestaurants();
      } else {
        delay = setTimeout(async () => {
          this.renderSearchRestaurants(searchValue);
        }, 500);
      }
    };
  }

  static async renderEmpty(text) {
    this.emptyElement.innerHTML = `<i class="fa fa-frown-o" aria-hidden="true"></i> ${text}`;
  }

  static async renderRestaurantList(getRestaurantsFn, emptyText) {
    const restoListElement = document.querySelector('resto-list');
    restoListElement.isLoading = true;
    const restaurants = await getRestaurantsFn();
    // for the sake of skeleton loading, should be commented to increase speed :D
    await BaseHelper.sleep(1000);
    restoListElement.isLoading = false;
    restoListElement.restaurants = restaurants;

    if (restaurants.length) {
      this.emptyElement.innerHTML = '';
    } else {
      this.renderEmpty(emptyText);
    }
  }

  static async renderAllRestaurants() {
    const mainTitleElement = document.querySelector('.main-title');
    mainTitleElement.textContent = 'Explore Restaurant';
    this.renderRestaurantList(function getRestaurants() {
      return RestaurantApi.list().catch();
    }, 'Sorry, no restaurants found in your area');
  }

  static async renderSearchRestaurants(searchValue) {
    const mainTitleElement = document.querySelector('.main-title');
    mainTitleElement.textContent = `Showing all result for "${searchValue}"`;
    this.renderRestaurantList(function getRestaurants() {
      return RestaurantApi.search(searchValue).catch();
    }, `Sorry, no restaurants found for "${searchValue}"`);
  }
}

export default RestaurantPage;
