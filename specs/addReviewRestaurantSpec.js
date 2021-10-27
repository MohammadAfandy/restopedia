import { addReviewRestoContainer, SnackBarInitiator } from './helpers/reviewRestaurantSetup';
import RestaurantApi from '../src/scripts/data/api/restaurant-api';
import * as TestFactories from './helpers/testFactories';

describe('Add Restaurant Review', () => {
  beforeEach(() => {
    addReviewRestoContainer();
  });

  it('should not add review when given name is empty', async () => {
    const restaurantId = 'some_restaurant_id';
    await TestFactories.createRestoReviewPresenter({
      id: restaurantId,
      customerReviews: [],
    });

    const postReviewData = {
      name: '',
      review: 'The price is good for a person with weak economy like me :(',
    };

    spyOn(RestaurantApi, 'addReview');

    const restoReviewElement = document.querySelector('resto-review');

    restoReviewElement.querySelector('#review_name').value = postReviewData.name;
    restoReviewElement.querySelector('#review_text').value = postReviewData.review;
    await restoReviewElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(RestaurantApi.addReview).not.toHaveBeenCalled();

    expect(SnackBarInitiator.show).toHaveBeenCalledWith({
      text: 'Name is required',
      type: 'failed',
    });
  });

  it('should not add review when given review is empty', async () => {
    const restaurantId = 'some_restaurant_id';
    await TestFactories.createRestoReviewPresenter({
      id: restaurantId,
      customerReviews: [],
    });

    const postReviewData = {
      name: 'John Doe',
      review: '',
    };

    spyOn(RestaurantApi, 'addReview');

    const restoReviewElement = document.querySelector('resto-review');

    restoReviewElement.querySelector('#review_name').value = postReviewData.name;
    restoReviewElement.querySelector('#review_text').value = postReviewData.review;
    await restoReviewElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(RestaurantApi.addReview).not.toHaveBeenCalled();

    expect(SnackBarInitiator.show).toHaveBeenCalledWith({
      text: 'Review is required',
      type: 'failed',
    });
  });

  it('should add review correctly when given parameter is correct', async () => {
    const restaurantId = 'some_restaurant_id';
    const date = '25 Oktober 2021';
    await TestFactories.createRestoReviewPresenter({
      id: restaurantId,
      customerReviews: [],
    });

    const postReviewData = {
      name: 'John Doe',
      review: 'The price is good for a person with weak economy like me :(',
    };

    spyOn(RestaurantApi, 'addReview').and.returnValue({
      error: false,
      message: 'success',
      customerReviews: [{ ...postReviewData, date }],
    });

    const restoReviewElement = document.querySelector('resto-review');

    restoReviewElement.querySelector('#review_name').value = postReviewData.name;
    restoReviewElement.querySelector('#review_text').value = postReviewData.review;
    await restoReviewElement.querySelector('form').dispatchEvent(new Event('submit'));

    expect(RestaurantApi.addReview).toHaveBeenCalledWith({
      id: restaurantId,
      ...postReviewData,
    });

    expect(SnackBarInitiator.show).toHaveBeenCalledWith({
      text: 'Your review has been added',
    });
  });
});
