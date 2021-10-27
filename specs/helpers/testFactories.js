import RestaurantApi from '../../src/scripts/data/api/restaurant-api';
import FavoriteRestaurantDB from '../../src/scripts/data/db/favorite-restaurant-db';
import LikeRestoPresenter from '../../src/scripts/presenters/like-resto-presenter';
import LikeRestoView from '../../src/scripts/views/like-resto-view';
import RestoReviewPresenter from '../../src/scripts/presenters/resto-review-presenter';
import RestoReviewView from '../../src/scripts/views/resto-review-view';

const createLikeRestoPresenter = async (restaurant) => {
  const likeRestoPresenter = new LikeRestoPresenter({
    view: LikeRestoView,
    favoriteRestaurantDb: FavoriteRestaurantDB,
  });
  await likeRestoPresenter.showLikeRestoButton(restaurant);
};

const createRestoReviewPresenter = async (restaurant) => {
  const restoReviewPresenter = new RestoReviewPresenter({
    view: RestoReviewView,
    restaurantApi: RestaurantApi,
  });
  await restoReviewPresenter.showReviews(restaurant);
};

export { createLikeRestoPresenter, createRestoReviewPresenter };
