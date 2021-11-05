const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorites');
});

Scenario('showing empty favorite restaurants', ({ I }) => {
  I.see('Favorite restaurant', '.main-title');
  I.see('You haven\'t added favorite restaurant yet', 'error-element');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('You haven\'t added favorite restaurant yet', 'error-element');

  I.amOnPage('/');

  I.seeElement('resto-item a');
  const firstRestaurant = locate('resto-item a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('like-button button[aria-label="Like this restaurant"]');
  I.click('like-button button[aria-label="Like this restaurant"]');

  I.amOnPage('/#/favorites');
  I.seeElement('resto-item');
  const likedRestaurantName = await I.grabTextFrom('resto-item a');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('liking multiple restaurants', async ({ I }) => {
  const count = 3;
  I.see('You haven\'t added favorite restaurant yet', 'error-element');

  I.amOnPage('/');

  const resto = [];
  for (let i = 1; i <= count; i++) {
    const selectedRestaurant = locate('resto-item a').at(i);
    resto.push(await I.grabTextFrom(selectedRestaurant));
    I.click(selectedRestaurant);

    I.seeElement('like-button button[aria-label="Like this restaurant"]');
    I.click('like-button button[aria-label="Like this restaurant"]');
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorites');
  const restoElementCount = await I.grabNumberOfVisibleElements('resto-item');

  assert.strictEqual(resto.length, restoElementCount);
});
