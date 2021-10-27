import BasePage from './base-page';
import UrlParser from '../utils/url-parser';
import BaseHelper from '../utils/base-helper';

class RestaurantDetailPage extends BasePage {
  static async render() {
    this.restoDetailView = (await import('../views/resto-detail-view')).default;
    this.likeRestoView = (await import('../views/like-resto-view')).default;
    this.restoReviewView = (await import('../views/resto-review-view')).default;
    this.restoReviewView.getTemplate();

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.restaurantId = UrlParser.parseIdFromSlug(url.id);

    return `
      <section id="content">
        ${this.restoDetailView.getTemplate()}
        ${this.likeRestoView.getTemplate()}
      </section>
    `;
  }

  static async afterRender() {
    const RestoDetailPresenter = (await import('../presenters/resto-detail-presenter')).default;
    const RestaurantApi = (await import('../data/api/restaurant-api')).default;
    this.restoDetailPresenter = new RestoDetailPresenter({
      view: this.restoDetailView,
      restaurantApi: RestaurantApi,
    });
    BaseHelper.setLoading('resto-detail');
    const restaurant = await this.restoDetailPresenter.getDetailRestaurant(this.restaurantId);
    BaseHelper.stopLoading('resto-detail');
    this.restoDetailPresenter.showDetailRestaurant(restaurant);

    const LikeRestoPresenter = (await import('../presenters/like-resto-presenter')).default;
    const FavoriteRestaurantDB = (await import('../data/db/favorite-restaurant-db')).default;
    this.likeRestoPresenter = new LikeRestoPresenter({
      view: this.likeRestoView,
      favoriteRestaurantDb: FavoriteRestaurantDB,
    });
    this.likeRestoPresenter.showLikeRestoButton(restaurant);

    const RestoReviewPresenter = (await import('../presenters/resto-review-presenter')).default;
    this.restoReviewPresenter = new RestoReviewPresenter({
      view: this.restoReviewView,
      restaurantApi: RestaurantApi,
    });
    this.restoReviewPresenter.showReviews(restaurant);
  }
}

export default RestaurantDetailPage;
