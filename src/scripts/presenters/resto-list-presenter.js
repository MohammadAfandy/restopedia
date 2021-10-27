import BaseHelper from '../utils/base-helper';

export default class RestoListPresenter {
  constructor({ view, restaurantApi, favoriteRestaurantDb }) {
    this.view = view;
    this.restaurantApi = restaurantApi;
    this.favoriteRestaurantDb = favoriteRestaurantDb;
  }

  async showAllRestaurants() {
    this.view.setTitle('Explore restaurant');

    BaseHelper.setLoading('resto-list');
    const restaurants = await this.restaurantApi.list();
    if (restaurants.length) {
      await this.view.renderRestaurants(restaurants);
    } else {
      this.view.renderError('Sorry, we couldn\'t load restaurants, please check your connection');
    }
    BaseHelper.stopLoading('resto-list');
  }

  async showSearchedRestaurants(searchValue) {
    this.view.setTitle(`Showing results for "${searchValue}"`);

    BaseHelper.setLoading('resto-list');
    const restaurants = await this.restaurantApi.search(searchValue);
    if (restaurants.length) {
      await this.view.renderRestaurants(restaurants);
    } else {
      this.view.renderError(`Sorry, no restaurants found for "${searchValue}"`);
    }
    BaseHelper.stopLoading('resto-list');
  }

  async showFavoriteRestaurants() {
    this.view.setTitle('Favorite restaurant');

    BaseHelper.setLoading('resto-list');
    const restaurants = await this.favoriteRestaurantDb.getAll();
    if (restaurants.length) {
      await this.view.renderRestaurants(restaurants);
    } else {
      this.view.renderError('You haven\'t added favorite restaurant yet');
    }
    BaseHelper.stopLoading('resto-list');
  }
}