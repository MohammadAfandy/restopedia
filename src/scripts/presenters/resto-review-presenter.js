import SnackBarInitiator from '../utils/snackbar-initiator';

export default class RestoReviewPresenter {
  constructor({ view, restaurantApi }) {
    this.view = view;
    this.restaurantApi = restaurantApi;
  }

  async showReviews({ id: restaurantId, customerReviews }) {
    this.view.renderListReviews(customerReviews);
    this.view.setRestaurantId(restaurantId);
    this.view.setPostReviewFn(this.postReview.bind(this));
  }

  async postReview(review) {
    const response = await this.restaurantApi.addReview(review);
    if (response.error === false) {
      SnackBarInitiator.show({
        text: 'Your review has been added',
      });
      this.view.renderListReviews(response.customerReviews);
    } else {
      SnackBarInitiator.show({
        text: response.message,
        type: 'failed',
      });
    }

    return response;
  }
}
