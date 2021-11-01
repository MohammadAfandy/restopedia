import BasePage from './base-page';
import UrlParser from '../utils/url-parser';

class RestaurantDetailPage extends BasePage {
  static async render() {
    const [
      { default: RestoDetailView },
      { default: LikeRestoView },
      { default: RestoReviewView },
    ] = await Promise.all([
      import('../views/resto-detail-view'),
      import('../views/like-resto-view'),
      import('../views/resto-review-view'),
    ]);

    this.restoDetailView = RestoDetailView;
    this.likeRestoView = LikeRestoView;
    this.restoReviewView = RestoReviewView;

    await this.restoReviewView.getTemplate();

    const url = UrlParser.parseActiveUrlWithoutCombiner();
    this.restaurantId = UrlParser.parseIdFromSlug(url.id);

    return `
      <section id="content">
        ${await this.restoDetailView.getTemplate()}
        ${await this.likeRestoView.getTemplate()}
      </section>
    `;
  }

  static async afterRender() {
    const [
      { default: RestoDetailPresenter },
      { default: LikeRestoPresenter },
      { default: RestoReviewPresenter },
      { default: RestaurantApi },
      { default: FavoriteRestaurantDB },
    ] = await Promise.all([
      import('../presenters/resto-detail-presenter'),
      import('../presenters/like-resto-presenter'),
      import('../presenters/resto-review-presenter'),
      import('../data/api/restaurant-api'),
      import('../data/db/favorite-restaurant-db'),
    ]);

    this.restoDetailPresenter = new RestoDetailPresenter({
      view: this.restoDetailView,
      restaurantApi: RestaurantApi,
    });
    this.restoDetailView.emptyRestaurant();
    const restaurant = await this.restoDetailPresenter.getDetailRestaurant(this.restaurantId);
    await this.restoDetailPresenter.showDetailRestaurant(restaurant);

    this.likeRestoPresenter = new LikeRestoPresenter({
      view: this.likeRestoView,
      favoriteRestaurantDb: FavoriteRestaurantDB,
    });
    this.likeRestoPresenter.showLikeRestoButton(restaurant);

    this.restoReviewPresenter = new RestoReviewPresenter({
      view: this.restoReviewView,
      restaurantApi: RestaurantApi,
    });
    this.restoReviewPresenter.showReviews(restaurant);
  }
}

export default RestaurantDetailPage;
