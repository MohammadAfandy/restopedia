import BasePage from './base-page';
import RestaurantApi from '../../data/api/restaurant-api';
import FavoriteRestaurantDB from '../../data/databases/favorite-restaurant-db';
import UrlParser from '../../utils/url-parser';
import BaseHelper from '../../utils/base-helper';
import SnackBarInitiator from '../../utils/snackbar-initiator';

class RestaurantDetailPage extends BasePage {
  static async render() {
    await import('../../components/RestoDetail/resto-detail');
    await import('../../components/ReviewPanel/review-panel');
    await import('../../components/LikeButton/like-button');
    return `
      <section id="content">
        <resto-detail></resto-detail>
        <div id="error_content"></div>
      </section>
    `;
  }

  static async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurantId = UrlParser.parseIdFromSlug(url.id);

    const restoDetailElement = document.querySelector('resto-detail');
    restoDetailElement.isLoading = true;
    this.restaurant = await RestaurantApi.detail(restaurantId);
    await BaseHelper.sleep(1000);
    restoDetailElement.isLoading = false;

    if (!this.restaurant) {
      this.renderEmpty();
    } else {
      restoDetailElement.restaurant = this.restaurant;

      // rerender page after add review
      restoDetailElement.onAfterAddReview = async () => {
        await this.afterRender();
      };
      document.querySelector('#content').append(document.createElement('like-button'));
      this.likeButton = document.querySelector('like-button');
      this.renderLikeButton();
    }
  }

  static async renderLikeButton() {
    if (await FavoriteRestaurantDB.isExist(this.restaurant.id)) {
      this.renderLikedButton();
    } else {
      this.renderUnLikedButton();
    }
  }

  static async renderLikedButton() {
    const { restaurant } = this;
    this.likeButton.ariaLabel = `Unlike restaurant ${restaurant.name}`;
    this.likeButton.isLiked = true;
    this.likeButton.onLike = async () => {
      await FavoriteRestaurantDB.delete(restaurant.id);
      SnackBarInitiator.show({
        text: 'Restaurant has been removed from favorite',
        type: 'failed',
      });
      this.renderLikeButton();
    };
  }

  static async renderUnLikedButton() {
    const { restaurant } = this;
    this.likeButton.ariaLabel = `Like restaurant ${restaurant.name}`;
    this.likeButton.isLiked = false;
    this.likeButton.onLike = async () => {
      await FavoriteRestaurantDB.put({
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
      this.renderLikeButton();
    };
  }

  static async renderEmpty() {
    const emptyElement = document.querySelector('#error_content');
    const text = 'Sorry, we couldn\'t load this restaurant';
    emptyElement.innerHTML = `<i class="fa fa-frown-o" aria-hidden="true"></i> ${text}`;
  }
}

export default RestaurantDetailPage;
