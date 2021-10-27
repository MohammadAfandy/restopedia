export default class RestoReviewView {
  static getTemplate() {
    import('../components/RestoReview/resto-review');
    return `
      <resto-review></resto-review>
    `;
  }

  static renderListReviews(reviews = []) {
    const restoReviewElement = document.querySelector('resto-review');
    restoReviewElement.reviews = reviews;
  }

  static setRestaurantId(restaurantId) {
    const restoReviewElement = document.querySelector('resto-review');
    restoReviewElement.restaurantId = restaurantId;
  }

  static setPostReviewFn(postReviewFn) {
    const restoReviewElement = document.querySelector('resto-review');
    restoReviewElement.postReview = postReviewFn;
  }
}
