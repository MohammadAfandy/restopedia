const assert = require('assert');

// set form review input data
const reviewData = {
  name: 'John Doe',
  review: 'The price is good for a person with weak economy like me :(',
  date: '27 Oktober 2021',
};

// set initial post response data
const responseReview = {
  error: false,
  message: 'success',
  customerReviews: [],
};

Feature('Adding Review Restaurant');

Scenario('adding one review', async ({ I }) => {
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

  const initialReviewerData = initialReviewerNames.map((name, idx) => ({
    name,
    date: initialReviewerDates[idx],
    review: initialReviewerReviews[idx],
  }));

  responseReview.customerReviews.push(...initialReviewerData, reviewData);

  I.seeElement('resto-review form');
  I.fillField('#review_name', reviewData.name);
  I.fillField('#review_text', reviewData.review);

  I.mockRequest('POST', 'https://restaurant-api.dicoding.dev/review', 200, responseReview);
  I.click('Send', 'resto-review form');
  // I.waitForResponse('https://restaurant-api.dicoding.dev/review');

  I.seeElement('resto-review ul li');

  const lastReviewLocatorName = locate('resto-review ul li.review_container .reviewer_name').last();
  const lastReviewLocatorText = locate('resto-review ul li.review_container .reviewer_review').last();
  const lastReviewName = await I.grabTextFrom(lastReviewLocatorName);
  const lastReviewText = await I.grabTextFrom(lastReviewLocatorText);

  assert.strictEqual(reviewData.name, lastReviewName);
  assert.strictEqual(reviewData.review, lastReviewText);
});
