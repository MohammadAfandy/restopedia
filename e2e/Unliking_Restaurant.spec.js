const assert = require('assert');

Feature('Unliking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see('You haven\'t added favorite restaurant yet', 'error-element');

  I.amOnPage('/');
  const firstRestaurant = locate('resto-item a').first();
  I.click(firstRestaurant);
  I.seeElement('like-button button[aria-label="Like this restaurant"]');
  I.click('like-button button[aria-label="Like this restaurant"]');

  I.amOnPage('/#/favorites');
  I.seeElement('resto-item a');
  const firstRestaurantLiked = locate('resto-item a').first();

  I.click(firstRestaurantLiked);
  I.seeElement('like-button button[aria-label="Unlike this restaurant"]');
  I.click('like-button button[aria-label="Unlike this restaurant"]');

  I.amOnPage('/#/favorites');
  I.see('You haven\'t added favorite restaurant yet', 'error-element');
});

Scenario('unliking multiple restaurants', async ({ I }) => {
  const count = 3;
  I.see('You haven\'t added favorite restaurant yet', 'error-element');

  I.amOnPage('/');
  const resto = [];
  for (let i = 1; i <= count; i++) {
    const selectedRestaurant = locate('resto-item a').at(i);
    /* eslint-disable no-await-in-loop */
    resto.push(await I.grabTextFrom(selectedRestaurant));
    I.click(selectedRestaurant);

    I.seeElement('like-button button[aria-label="Like this restaurant"]');
    I.click('like-button button[aria-label="Like this restaurant"]');
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorites');
  const restoElementCount = await I.grabNumberOfVisibleElements('resto-item');
  assert.strictEqual(resto.length, restoElementCount);

  for (let i = 1; i <= count; i += 1) {
    const firstRestaurantLikedFound = locate('resto-item a').first();
    I.click(firstRestaurantLikedFound);

    I.seeElement('like-button button[aria-label="Unlike this restaurant"]');
    I.click('like-button button[aria-label="Unlike this restaurant"]');
    I.amOnPage('/#/favorites');
  }

  I.amOnPage('/#/favorites');
  I.see('You haven\'t added favorite restaurant yet', 'error-element');
});
