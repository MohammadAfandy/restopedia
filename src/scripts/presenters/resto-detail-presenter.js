export default class RestoDetailPresenter {
  constructor({ view, restaurantApi }) {
    this.view = view;
    this.restaurantApi = restaurantApi;
  }

  async getDetailRestaurant(restaurantId) {
    return this.restaurantApi.detail(restaurantId);
  }

  async showDetailRestaurant(restaurant) {
    this.view.setTitle('Detail Restaurant');

    if (restaurant) {
      await this.view.renderRestaurant(restaurant);
    } else {
      this.view.renderError('Sorry, we couldn\'t load this restaurant');
    }
  }
}
