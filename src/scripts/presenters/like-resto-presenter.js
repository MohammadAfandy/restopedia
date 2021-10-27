import SnackBarInitiator from '../utils/snackbar-initiator';

export default class LikeRestoPresenter {
  constructor({ view, favoriteRestaurantDb }) {
    this.view = view;
    this.favoriteRestaurantDb = favoriteRestaurantDb;
  }

  async showLikeRestoButton(restaurant) {
    const isRestoLiked = await this.favoriteRestaurantDb.isExist(restaurant.id);
    if (isRestoLiked) {
      this.view.renderLikedButton(async () => {
        await this.UnlikeResto(restaurant.id);
        await this.showLikeRestoButton(restaurant);
      });
    } else {
      this.view.renderUnlikedButton(async () => {
        await this.likeResto(restaurant);
        await this.showLikeRestoButton(restaurant);
      });
    }
  }

  async likeResto(restaurant) {
    await this.favoriteRestaurantDb.put({
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      city: restaurant.city,
      rating: restaurant.rating,
      picture: restaurant.picture,
    });
    SnackBarInitiator.show({
      text: 'Restaurant has been added to favorite',
    });
  }

  async UnlikeResto(restaurantId) {
    await this.favoriteRestaurantDb.delete(restaurantId);
    SnackBarInitiator.show({
      text: 'Restaurant has been removed from favorite',
      type: 'failed',
    });
  }
}
