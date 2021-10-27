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
  I.waitForElement('like-button button[aria-label="Like this restaurant"]', 5);
  I.click('like-button button[aria-label="Like this restaurant"]');

  I.amOnPage('/#/favorites');
  I.wait(2);
  I.seeElement('resto-item a');
  const firstRestaurantLiked = locate('resto-item a').first();

  I.click(firstRestaurantLiked);
  I.waitForElement('like-button button[aria-label="Unlike this restaurant"]', 5);
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
    resto.push(await I.grabTextFrom(selectedRestaurant));
    I.click(selectedRestaurant);

    I.waitForElement('like-button button[aria-label="Like this restaurant"]', 5);
    I.click('like-button button[aria-label="Like this restaurant"]');
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorites');
  I.wait(2);
  const restoElementCount = await I.grabNumberOfVisibleElements('resto-item');
  assert.strictEqual(resto.length, restoElementCount);

  I.amOnPage('/#/favorites');
  for (let i = 1; i <= count; i++) {
    const firstRestaurantLikedFound = locate('resto-item a').first();
    I.click(firstRestaurantLikedFound);

    I.waitForElement('like-button button[aria-label="Unlike this restaurant"]', 5);
    I.click('like-button button[aria-label="Unlike this restaurant"]');
    I.amOnPage('/#/favorites');
  }

  I.amOnPage('/#/favorites');
  I.see('You haven\'t added favorite restaurant yet', 'error-element');
});
