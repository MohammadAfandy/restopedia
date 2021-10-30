const assert = require('assert');
const { randomNumber } = require('./helpers/helper');

Feature('Adding Review Restaurant');

Scenario('adding one review', async ({ I }) => {
  const reviewData = {
    name: `John Doe ${randomNumber(100, 999)}`,
    review: `Hello from codecept ${randomNumber(100, 999)}`,
  };

  I.amOnPage('/');

  I.seeElement('resto-item a');
  const firstRestaurant = locate('resto-item a').first();
  I.click(firstRestaurant);

  I.seeElement('resto-review li.review_container');
  const initialReviewerNames = await I.grabTextFromAll('resto-review li.review_container .reviewer_name');
  const initialReviewerDates = await I.grabTextFromAll('resto-review li.review_container .reviewer_date');
  const initialReviewerReviews = await I.grabTextFromAll('resto-review li.review_container .reviewer_review');

  // make sure all data have the same length
  assert.strictEqual(
    initialReviewerNames.length,
    initialReviewerDates.length,
    initialReviewerReviews.length,
  );

  I.seeElement('resto-review form');
  I.fillField('#review_name', reviewData.name);
  I.fillField('#review_text', reviewData.review);

  /**
   * actually I want to mock the request
   * but there is an issue in codeceptjs/mock-request that hast not been resolved yet
   * https://github.com/codeceptjs/mock-request/issues/4
   */
  // I.mockRequest('POST', 'https://restaurant-api.dicoding.dev/review', 200, {
  //   error: false,
  //   message: 'success',
  //   customerReviews: [reviewData],
  // });

  I.click('Send', 'resto-review form');
  I.wait(2);

  I.seeElement('resto-review ul li');
  I.see(reviewData.name, 'resto-review ul li.review_container .reviewer_name');
  I.see(reviewData.review, 'resto-review ul li.review_container .reviewer_review');
});
