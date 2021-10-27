const assert = require('assert');

Feature('Adding Review Restaurant');

Scenario('adding one review', async ({ I }) => {
  I.amOnPage('/');

  I.seeElement('resto-item a');
  const firstRestaurant = locate('resto-item a').first();
  I.click(firstRestaurant);

  I.waitForElement('resto-review form', 5);

  const reviewerName = 'John Doe';
  const reviewerReview = 'The price is good for a person with weak economy like me :(';
  I.fillField('#review_name', reviewerName);
  I.fillField('#review_text', reviewerReview);
  I.click('Send', 'resto-review form');

  // I.wait(1);
  I.waitForElement('resto-review ul li', 5);

  const lastReviewLocatorName = locate('resto-review ul li .reviewer_name').last();
  const lastReviewLocatorText = locate('resto-review ul li .reviewer_review').last();
  const lastReviewName = await I.grabTextFrom(lastReviewLocatorName);
  const lastReviewText = await I.grabTextFrom(lastReviewLocatorText);

  assert.strictEqual(reviewerName, lastReviewName);
  assert.strictEqual(reviewerReview, lastReviewText);
});
