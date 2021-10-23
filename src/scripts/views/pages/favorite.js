import BasePage from './base-page';
import FavoriteRestaurantDB from '../../data/databases/favorite-restaurant-db';
import BaseHelper from '../../utils/base-helper';

class FavoritePage extends BasePage {
  static async render() {
    await import('../../components/RestoList/resto-list');
    return `
      <section id="content">
        <h2 class="main-title">Favorite Restaurants</h2>
        <resto-list></resto-list>
        <div id="error_content"></div>
      </section>
    `;
  }

  static async afterRender() {
    this.errorContent = document.querySelector('#error_content');
    const restoListElement = document.querySelector('resto-list');

    restoListElement.isLoading = true;
    const favoriteRestaurants = await FavoriteRestaurantDB.getAll();
    await BaseHelper.sleep(1000);
    restoListElement.isLoading = false;
    restoListElement.restaurants = favoriteRestaurants;

    if (favoriteRestaurants.length) {
      this.errorContent.innerHTML = '';
    } else {
      this.renderEmpty();
    }
  }

  static async renderEmpty() {
    const text = 'You haven\'t added favorite restaurant yet';
    this.errorContent.innerHTML = `<i class="fa fa-frown-o" aria-hidden="true"></i> ${text}`;
  }
}

export default FavoritePage;
