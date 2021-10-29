import { addReviewRestoContainer } from './helpers/reviewRestaurantSetup';
import * as TestFactories from './helpers/testFactories';

describe('Show Restaurant Reviews', () => {
  beforeEach(async () => {
    await addReviewRestoContainer();
  });

  it('should show reviews correctly when reviews exist', async () => {
    const customerReviews = [
      {
        name: 'user 1',
        review: 'review 1',
        date: '26 Oktober 2021',
      },
      {
        name: 'user 2',
        review: 'review 2',
        date: '26 Oktober 2021',
      },
      {
        name: 'user 3',
        review: 'review 3',
        date: '27 Oktober 2021',
      },
    ];
    await TestFactories.createRestoReviewPresenter({
      id: 'some_restaurant_id',
      customerReviews,
    });

    const restoReviewElement = document.querySelector('resto-review');
    const reviewsElement = restoReviewElement.querySelectorAll('ul li.review_container');

    expect(reviewsElement.length).toBe(customerReviews.length);

    reviewsElement.forEach((reviewElement, idx) => {
      expect(reviewElement.querySelector('.reviewer_name').textContent).toBe(customerReviews[idx].name);
      expect(reviewElement.querySelector('.reviewer_date').textContent).toBe(customerReviews[idx].date);
      expect(reviewElement.querySelector('.reviewer_review').textContent).toBe(customerReviews[idx].review);
    });
  });

  it('should not show reviews when reviews not exist', async () => {
    const customerReviews = [];
    await TestFactories.createRestoReviewPresenter({
      id: 'some_restaurant_id',
      customerReviews,
    });

    const restoReviewElement = document.querySelector('resto-review');
    const reviewsElement = restoReviewElement.querySelectorAll('ul li.review_container');

    expect(reviewsElement.length).toBe(0);
  });

  it('should show empty info when reviews not exist', async () => {
    const customerReviews = [];
    await TestFactories.createRestoReviewPresenter({
      id: 'some_restaurant_id',
      customerReviews,
    });

    const restoReviewElement = document.querySelector('resto-review');
    const reviewsElement = restoReviewElement.querySelectorAll('ul li');

    expect(reviewsElement[0].textContent).toBe('No reviews found');
  });

  it('should show form review with empty input', async () => {
    const customerReviews = [];
    await TestFactories.createRestoReviewPresenter({
      id: 'some_restaurant_id',
      customerReviews,
    });

    const restoReviewElement = document.querySelector('resto-review');
    const formELement = restoReviewElement.querySelector('form');

    formELement.querySelectorAll('input, textarea').forEach((formField) => {
      expect(formField.value).toBe('');
    });
  });

  it('should show form review with a submit button', async () => {
    const customerReviews = [];
    await TestFactories.createRestoReviewPresenter({
      id: 'some_restaurant_id',
      customerReviews,
    });

    const restoReviewElement = document.querySelector('resto-review');
    const formELement = restoReviewElement.querySelector('form');

    expect(formELement.querySelector('[type="submit"]')).toBeTruthy();
  });
});
